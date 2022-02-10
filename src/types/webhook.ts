export type IFFParameter = Record<string, unknown>;

export type IFFOutputContext = {
  name: string;
  lifespanCount: number;
};

export type IFFIntent = {
  name: string;
  displayName: string;
};

export type IFFResponse = {
  fulfillmentText?: string;
  followupEventInput?: {
    name: string;
    languageCode: string;
  };
  outputContexts?: IFFOutputContext[];
};

export type IFFRequest = {
  session: string;
  queryResult: {
    queryText: string;
    languageCode: string;
    action: string;
    parameters: IFFParameter;
    outputContexts: IFFOutputContext[];
    intent: IFFIntent;
  };
};
