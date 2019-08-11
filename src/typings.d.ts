/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var documentType: DocumentType;
interface DocumentType {
  readonly name: string;
  readonly publicId: string;
  readonly systemId: string;
  internalSubset: string;
}
