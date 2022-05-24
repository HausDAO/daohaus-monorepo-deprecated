import { NewPost } from "../generated/Poster/Poster";
import { log } from "@graphprotocol/graph-ts";
import { parser } from "./util/parser";
import { constants } from "./util/constants";
import { validator } from "./util/validator";
import { Dao, EventTransaction } from "../generated/schema";

// event NewPost(address indexed user, string content, string indexed tag);
export function handleNewPost(event: NewPost): void {
  log.info("^^^handleNewPost tag, {}", [event.params.tag.toHexString()]);

  let validTags: string[] = [constants.DAOHAUS_METADATA_SUMMONER_TAG];
  let validTag = validTags.includes(event.params.tag.toHexString());
  if (!validTag) {
    log.info("^^^invalidTag", []);
    return;
  }

  log.info("event.params.content, {}", [event.params.content]);

  let result = parser.getResultFromJson(event.params.content);
  if (result.error != "none") {
    log.error("no content", []);
    return;
  }
  let object = result.object;

  if (
    event.params.tag.toHexString() == constants.DAOHAUS_METADATA_SUMMONER_TAG
  ) {
    // to validate it's from the factory we need to look at event.transaction.to
    // but would need to store all potential factory addresses
    // only danger without is a bunch of metadata records not attached to a dao
    parser.createDaoMetaSummoning(object, event.params.user, event);
  }

  //   let moloch = parser.getStringFromJson(object, "molochAddress");
  //   if (moloch.error != "none") {
  //     log.error('Post with content ID {} errored on "type" parameter', [
  //       event.transaction.hash.toHexString(),
  //     ]);
  //     return;
  //   }
  //   let molochAddress = moloch.data;

  //   if (event.params.tag.toHexString() == constants.DAOHAUS_DOCUMENT_MINION) {
  //     log.info("validating minion", []);
  //     let isValid = validator.isMolochMinion(molochAddress, event.transaction.to);
  //     if (isValid == false) {
  //       return;
  //     }

  //     parser.createBasicContent(object, molochAddress, event, true);
  //   }

  //   if (event.params.tag.toHexString() == constants.DAOHAUS_DOCUMENT_MEMBER) {
  //     log.info("validating member", []);

  //     let isValid = validator.isMolochMember(
  //       molochAddress,
  //       event.transaction.from
  //     );
  //     if (isValid == false) {
  //       return;
  //     }

  //     parser.createBasicContent(object, molochAddress, event, false);
  //   }
}
