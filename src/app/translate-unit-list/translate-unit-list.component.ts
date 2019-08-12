import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslationUnit } from '../model/translation-unit';
import { MatRadioChange } from '@angular/material';
import { TranslationFileView } from '../model/translation-file-view';
import { WorkflowType } from '../model/translation-project';
import { Subject, Subscription } from 'rxjs';
import { TranslationFilter, TranslationUnitFilterService } from '../model/filters/translation-unit-filter.service';
import { debounceTime } from 'rxjs/operators';

/**
 * Component that shows a list of trans units.
 * It allows to filter by different criteria and to select a unit.
 */
@Component({
  selector: 'app-translate-unit-list',
  templateUrl: './translate-unit-list.component.html',
  styleUrls: ['./translate-unit-list.component.scss'],
})
export class TranslateUnitListComponent implements OnInit {
  TranslationFilter = TranslationFilter;
  private _translationFileView: TranslationFileView;
  public _selectedFilterName = 'all';
  public substringToSearch: string;
  private substringSubject: Subject<string>;
  private substringSubscription: Subscription;

  /** workflowType determines, what filters are visibile. */
  // @Input() workflowType: WorkflowType;
  // @Input() hasAutotranslatedUnits: boolean;

  private _filterBy: TranslationFilter;
  @Input() set filterBy(value: TranslationFilter) {
    this.filterChanged(value);
    this._filterBy = value;
  }
  get filterBy() {
    return this._filterBy;
  }

  @Input() public get translationFileView() {
    return this._translationFileView;
  }

  /**
   * Emitted, when user wants to navigate to another unit.
   * @type {EventEmitter<TranslationUnit>} the wanted trans unit.
   */
  @Output() changeTranslationUnit: EventEmitter<TranslationUnit> = new EventEmitter();

  constructor(private translationUnitFilterService: TranslationUnitFilterService) {
    this.translationFileView = new TranslationFileView(null);
    this.substringSubject = new Subject<string>();
  }

  public set translationFileView(view: TranslationFileView) {
    if (view) {
      this._translationFileView = view;
    } else {
      this._translationFileView = new TranslationFileView(null);
    }
    this._selectedFilterName = this._translationFileView.activeFilter().name();
  }

  ngOnInit() {
    this.filterChanged(this.filterBy);
  }

  public transUnits(): TranslationUnit[] {
    return this.translationFileView.scrollableTransUnits();
  }

  substringToSearchChange() {
    this.substringSubject.next(this.substringToSearch);
  }

  filterChanged(filter: TranslationFilter = TranslationFilter.ALL) {
    if (filter === TranslationFilter.SUBSTRING) {
      if (this.substringSubscription) {
        this.substringSubscription.unsubscribe();
      }
      this.substringSubscription = this.substringSubject.pipe(debounceTime(400)).subscribe(sub => {
        this.translationFileView.setActiveFilter(this.translationUnitFilterService.getFilter(TranslationFilter.SUBSTRING, sub));
      });

      const substr = this.substringToSearch ? this.substringToSearch : '';
      this.substringSubject.next(substr);
    }

    return this.translationFileView.setActiveFilter(this.translationUnitFilterService.getFilter(filter));
  }

  public selectTransUnit(tu: TranslationUnit) {
    this.changeTranslationUnit.emit(tu);
  }

  isSelected(tu: TranslationUnit): boolean {
    return tu && tu === this.translationFileView.currentTransUnit();
  }
}
