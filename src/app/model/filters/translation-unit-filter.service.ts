import { Injectable } from '@angular/core';
import { ITranslationUnitFilter } from './i-translation-unit-filter';
import { TranslationUnitFilterAll } from './translation-unit-filter-all';
import { TranslationUnitFilterAutoTranslated } from './translation-unit-filter-autotranslated';
import { AutoTranslateSummaryReport } from '../auto-translate-summary-report';
import { TranslationUnitFilterAutoTranslatedFailed } from './translation-unit-filter-autotranslated-failed';
import { TranslationUnitFilterAutoTranslatedIgnored } from './translation-unit-filter-autotranslated-ignored';
import { TranslationUnitFilterNeedsReview } from './translation-unit-filter-needs-review';
import { TranslationUnitFilterSubstring } from './translation-unit-filter-substring';
import { TranslationUnitFilterUntranslated } from './translation-unit-filter-untranslated';

export enum TranslationFilter {
  ALL = 'all',
  UNTRANSLATED = 'untranslated',
  SUBSTRING = 'bySubstring',
  NEEDS_REVIEW = 'needsReview',
  AUTOTRANSLATED = 'autotranslated',
  AUTOTRANSLATED_FAILED = 'autotranslatedFailed',
  AUTOTRANSLATED_IGNORED = 'autotranslatedIgnored',
}

export const TranslationFilterDescription = {
  [TranslationFilter.ALL]: 'All',
  [TranslationFilter.UNTRANSLATED]: 'Untranslated',
  [TranslationFilter.SUBSTRING]: 'Search Substring',
  [TranslationFilter.NEEDS_REVIEW]: 'Needs Review',
  [TranslationFilter.AUTOTRANSLATED]: 'Autotranslated',
  [TranslationFilter.AUTOTRANSLATED_FAILED]: 'Autotranslate Failed',
  [TranslationFilter.AUTOTRANSLATED_IGNORED]: 'Autotranslate Ignored',
};

@Injectable()
export class TranslationUnitFilterService {
  private _autoTranslateSummaryReport: AutoTranslateSummaryReport;

  constructor() {}

  /**
   * Create a new filter.
   * @param name TranslationFilter
   * @param substr Substring in case of FILTER_SUBSTRING
   * @return {ITranslationUnitFilter} new filter instance
   */
  public getFilter(name: TranslationFilter, substr?: string): ITranslationUnitFilter {
    switch (name) {
      case TranslationFilter.ALL:
        return new TranslationUnitFilterAll();
      case TranslationFilter.AUTOTRANSLATED:
        return new TranslationUnitFilterAutoTranslated(this._autoTranslateSummaryReport);
      case TranslationFilter.AUTOTRANSLATED_FAILED:
        return new TranslationUnitFilterAutoTranslatedFailed(this._autoTranslateSummaryReport);
      case TranslationFilter.AUTOTRANSLATED_IGNORED:
        return new TranslationUnitFilterAutoTranslatedIgnored(this._autoTranslateSummaryReport);
      case TranslationFilter.NEEDS_REVIEW:
        return new TranslationUnitFilterNeedsReview();
      case TranslationFilter.SUBSTRING:
        return new TranslationUnitFilterSubstring(substr);
      case TranslationFilter.UNTRANSLATED:
        return new TranslationUnitFilterUntranslated();
    }
    return null;
  }

  /**
   * Remember the last Autotranslate Summary report.
   * Some filters need that.
   * @param summary
   */
  public setAutotranslateSummaryReport(summary: AutoTranslateSummaryReport) {
    this._autoTranslateSummaryReport = summary;
  }
}
