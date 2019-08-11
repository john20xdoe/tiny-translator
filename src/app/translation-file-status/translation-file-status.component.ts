import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslationFile } from '../model/translation-file';
import { TranslationFileView } from '../model/translation-file-view';

/**
 * Component to show the current status of a loaded translation file.
 * It shows the size, number of translations, wether it is changed etc.
 */
@Component({
  selector: 'app-translation-file-status',
  templateUrl: './translation-file-status.component.html',
  styleUrls: ['./translation-file-status.component.css'],
})
export class TranslationFileStatusComponent implements OnInit {
  @Input() translationFile: TranslationFile;
  @Input() translationFileView: TranslationFileView;
  @Input() shortInfo = false;

  @Output() onSave: EventEmitter<TranslationFile> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  /**
   * percentage translated rounded to 0 digits.
   * @return {any}
   */
  public percentageTranslated(): string {
    if (this.translationFile) {
      let result: number = this.translationFile.percentageTranslated();
      return result.toFixed(0);
    } else {
      return '0';
    }
  }

  /** specific number of untranslated and translated units */
  public unitsCount(): string {
    if (this.translationFile) {
      let { numberOfTransUnits, numberOfUntranslatedTransUnits } = this.translationFile;
      return `${numberOfUntranslatedTransUnits}/${numberOfTransUnits}`;
    }
    return 'None';
  }

  /**
   * Save the changed file.
   */
  public save() {
    if (this.translationFile) {
      this.onSave.emit(this.translationFile);
    }
  }
}
