import * as _ from "vtils";
import EE from "onfire.js";
import baseComponent from "./middleware/base_component";
import cryptoTool from "./utils/crypto_tool";
import calendar from "./utils/calendar";
import utils from "./utils/utils";
import validation from "./utils/validation";
import decorator from "./utils/decorator";
import encrypt from "./utils/encrypt";
import eventHub from "./utils/hub";
import { eventLock, eventLockDely } from "./utils/lock";
import { typeColor, capsuleLog } from "./utils/myLog";
import { idValidator, idValidatorGB } from "./utils/idValidator";

import cachePool from "./cache/cache_manger";
import fetchPack, { FetchPack } from "./net/fetch";
import proxy from "./net/proxy";
import ossTool from "./oss/oss_tool";
import OSSClient from "./oss/oss_client";

import HFCascader from "./components/cascader";
import HFImage, { EmImgProcessType, computeUrl } from "./components/image";
import HFSelect from "./components/select";
import HFTable, {
  HFFilter,
  TabColumnType,
  FilterItemType
} from "./components/table";
import HFTree from "./components/tree";
import HFUpload from "./components/upload";
import NOPower from "./components/error";
export const event = new EE();
export const tools = _;
export {
  eventHub,
  idValidator,
  idValidatorGB,
  typeColor,
  capsuleLog,
  eventLock,
  eventLockDely,
  FetchPack,
  baseComponent,
  fetchPack,
  proxy,
  cryptoTool,
  calendar,
  ossTool,
  utils,
  validation,
  cachePool,
  OSSClient,
  decorator,
  encrypt,
  HFImage,
  EmImgProcessType,
  computeUrl,
  HFCascader,
  HFSelect,
  HFTable,
  HFFilter,
  TabColumnType,
  FilterItemType,
  HFTree,
  HFUpload,
  NOPower
};
