import { NewPost } from '../generated/Poster/Poster';
import { log } from '@graphprotocol/graph-ts';
import { parser } from './util/parser';
import { constants } from './util/constants';

// event NewPost(address indexed user, string content, string indexed tag);
export function handleNewPost(event: NewPost): void {
  log.info('^^^handleNewPost tag, {}', [event.params.tag.toHexString()]);

  let validTags: string[] = [constants.DAOHAUS_METADATA_SUMMONER_TAG];
  let validTag = validTags.includes(event.params.tag.toHexString());
  if (!validTag) {
    log.info('^^^invalidTag', []);
    return;
  }

  log.info('event.params.content, {}', [event.params.content]);

  let result = parser.getResultFromJson(event.params.content);
  if (result.error != 'none') {
    log.error('no content', []);
    return;
  }
  let object = result.object;

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_METADATA_SUMMONER_TAG
  ) {
    parser.createDaoMetaSummoning(object, event.params.user, event);
  }
}
