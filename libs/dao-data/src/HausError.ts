export type ErrorType =
  | 'SUBGRAPH_ERROR'
  | 'UNSUPPORTED_NETWORK'
  | 'REQUEST_ERROR';

const errorTypeToTitleMap = new Map<ErrorType, string>([
  ['SUBGRAPH_ERROR', 'Subgraph Error'],
  ['UNSUPPORTED_NETWORK', 'Unsupported Network'],
  ['REQUEST_ERROR', 'Request error'],
]);

interface ErrorProps {
  type: ErrorType;
  errorObject?: unknown;
}

export class HausError {
  readonly type: ErrorType;
  readonly message: string;
  readonly errorObject?: unknown;

  constructor(props: ErrorProps) {
    const { type, errorObject } = props;

    const title = errorTypeToTitleMap.get(type);
    const formattedErrorObject = errorObject
      ? ': ' + JSON.stringify(errorObject, null, 2)
      : '';
    this.type = type;
    this.errorObject = errorObject;
    this.message = title + ' Error - ' + formattedErrorObject;
  }
}
