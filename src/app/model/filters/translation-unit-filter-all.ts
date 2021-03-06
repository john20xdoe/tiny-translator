import { ITranslationUnitFilter } from './i-translation-unit-filter';
import { TranslationUnit } from '../translation-unit';
/**
 * Filter that filters all units.
 * Created by martin on 27.05.2017.
 */
export class TranslationUnitFilterAll implements ITranslationUnitFilter {
  public filters(tu: TranslationUnit): boolean {
    return true;
  }

  public name(): string {
    return 'all';
  }
}
