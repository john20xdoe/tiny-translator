import { Component, OnInit } from '@angular/core';
import { TinyTranslatorService } from '../model/tiny-translator.service';
import { TranslationUnit } from '../model/translation-unit';
import { TranslationProject, UserRole, WorkflowType } from '../model/translation-project';
import { TranslationFileView } from '../model/translation-file-view';
import { NavigationDirection, TranslateUnitChange } from '../translate-unit/translate-unit.component';
import { TranslationFilter, TranslationFilterDescription } from '../model/filters/translation-unit-filter.service';
@Component({
  selector: 'app-translate-page',
  templateUrl: './translate-page.component.html',
  styleUrls: ['./translate-page.component.scss'],
})
export class TranslatePageComponent implements OnInit {
  selectedTab = 0;
  get tabs() {
    return Object.keys(TranslationFilter)
      .map(k => TranslationFilter[k as any])
      .map(v => v as TranslationFilter)
      .filter(tf =>
        [TranslationFilter.AUTOTRANSLATED, TranslationFilter.AUTOTRANSLATED_FAILED, TranslationFilter.AUTOTRANSLATED_IGNORED].includes(tf) ? this.hasAutotranslatedUnits() : true,
      )
      .filter(tf => (tf === TranslationFilter.NEEDS_REVIEW ? this.isWorkflowWithReview() : true));
  }
  readonly tabNames = Object.values(TranslationFilterDescription);

  constructor(private translationService: TinyTranslatorService) {}

  ngOnInit() {}

  currentProject(): TranslationProject {
    return this.translationService.currentProject();
  }

  currentView(): TranslationFileView {
    return this.currentProject() ? this.currentProject().translationFileView : null;
  }

  currentTranslationUnit(): TranslationUnit {
    const currentProject = this.currentProject();
    return currentProject ? currentProject.translationFileView.currentTransUnit() : null;
  }

  isWorkflowWithReview(): boolean {
    return this.currentProject().workflowType === WorkflowType.WITH_REVIEW;
  }

  commitChanges(translateUnitChange: TranslateUnitChange) {
    const direction = translateUnitChange.navigationDirection;
    if (direction === NavigationDirection.NEXT) {
      this.translationService.nextTransUnit();
    } else if (direction === NavigationDirection.PREV) {
      this.translationService.prevTransUnit();
    }
    if (translateUnitChange.changedUnit) {
      this.translationService.commitChanges(this.currentProject());
      if (this.currentView()) {
        this.currentView().refresh();
      }
    }
  }

  /**
   * Navigate to another unit.
   * @param translationUnit
   */
  onChangeTranslationUnit(translationUnit: TranslationUnit) {
    this.translationService.selectTransUnit(translationUnit);
  }

  save() {
    this.translationService.saveProject(this.currentProject());
  }

  isInReviewMode(): boolean {
    return this.currentProject() && this.currentProject().userRole === UserRole.REVIEWER;
  }

  hasAutotranslatedUnits(): boolean {
    return (
      this.currentProject() &&
      this.currentProject().autoTranslateSummaryReport() &&
      this.currentProject()
        .autoTranslateSummaryReport()
        .total() > 0
    );
  }

  filterChanged(index = 0) {
    this.selectedTab = index;

    return;
  }
}
