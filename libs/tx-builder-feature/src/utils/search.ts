import { ArbitraryState, StringSearch } from '@daohaus/common-utilities';

export const deepSearch = (
  appState: ArbitraryState,
  pathString: StringSearch
): unknown => {
  const path = pathString.trim().split('.').filter(Boolean);
  let state = { ...appState };
  for (let i = 0, len = path.length; i < len; i++) {
    state = state?.[path?.[i]];
  }
  return state;
};

export const searchApp = (
  appState: ArbitraryState,
  pathString: StringSearch,
  shouldThrow = false
) => {
  const result = deepSearch(appState, pathString) || false;
  if (!result != null) {
    if (shouldThrow) {
      console.log('**Application State**', appState);
      throw new Error(`Could not find ${pathString}`);
    } else {
      return false;
    }
  }
  return result;
};

export const checkHasCondition = (pathString: StringSearch) =>
  pathString.includes('||');
export const handleConditionalPath = (pathString: StringSearch) => {
  const paths = pathString
    .trim()
    .split('||')
    .map((str) => str.trim())
    .filter(Boolean);

  return paths;
};

export const searchArg = (
  appState: ArbitraryState,
  pathString: StringSearch
) => {
  const hasCondition = checkHasCondition(pathString);

  if (hasCondition) {
    const paths = handleConditionalPath(pathString);
    for (const path of paths) {
      const result = searchApp(appState, path as StringSearch);
      if (result != null) {
        return result;
      }
    }
    console.log('**Application State**', appState);
    console.log('**Path**', pathString);
    throw new Error(`No paths in conditional path string returned a value`);
  }
  return searchApp(appState, pathString, true);
};
