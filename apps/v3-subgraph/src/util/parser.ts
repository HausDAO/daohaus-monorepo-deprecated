import {
  Bytes,
  log,
  JSONValue,
  JSONValueKind,
  TypedMap,
  json,
  ByteArray,
  Address,
} from "@graphprotocol/graph-ts";
import { NewPost } from "../../generated/Poster/Poster";
import { MetaData, Proposal } from "../../generated/schema";

class JsonStringResult {
  data: string;
  error: string;
}
class JsonResult {
  object: TypedMap<string, JSONValue>;
  error: string;
}

export namespace parser {
  export function getResultFromJson(content: string): JsonResult {
    let result: JsonResult;
    result.error = "none";
    let bytes = changetype<Bytes>(ByteArray.fromUTF8(content));

    // let jsonResult = json.try_fromBytes(ByteArray.fromUTF8(content) as Bytes);
    let jsonResult = json.try_fromBytes(bytes);

    if (jsonResult.isError) {
      result.error = "Failed to parse JSON";
      return result;
    }
    result.object = jsonResult.value.toObject();
    return result;
  }

  export function getStringFromJson(
    object: TypedMap<string, JSONValue>,
    key: string
  ): JsonStringResult {
    let result: JsonStringResult;
    result.error = "none";
    let value = object.get(key);

    if (!value || value.kind != JSONValueKind.STRING) {
      result.error = "Missing valid Poster field: " + key;
      return result;
    }
    result.data = value.toString();
    return result;
  }

  export function getObjectFromJson(
    object: TypedMap<string, JSONValue>,
    key: string
  ): JsonResult {
    let result: JsonResult;
    result.error = "none";
    let value = object.get(key);

    if (!value || value.kind != JSONValueKind.OBJECT) {
      result.error = "Missing valid Poster field: " + key;
      return result;
    }
    result.object = value.toObject();
    return result;
  }

  export function createDaoMetaSummoning(
    object: TypedMap<string, JSONValue>,
    daoAddress: Bytes | null,

    event: NewPost
  ): boolean {
    if (daoAddress === null) {
      return false;
    }
    let entityId = daoAddress
      .toHexString()
      .concat("-content-")
      .concat(event.block.timestamp.toString());
    let entity = new MetaData(entityId);

    let name = parser.getStringFromJson(object, "name");
    if (name.error != "none") {
      return false;
    }
    entity.name = name.data;

    entity.createdAt = event.block.timestamp.toString();
    entity.createdBy = daoAddress;
    entity.dao = daoAddress.toHexString();
    entity.rawContent = event.params.content;

    entity.save();

    return true;
  }
}
