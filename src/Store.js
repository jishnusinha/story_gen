import $ from "jquery";
import Utils from "./Utils.js";

/*global localStorage */

const cached_data_ids = {
  "token": 1,
  "current_filters": 1,
  "lookupdata":1,
  "entitiesdata":1,
  "entitiy_instance_data":1,
  "tag_instance_data":1,
  "menu_type":1,
  "menu_index":1,
  "data":1,
 /* "validation_obj":1,
  "valid_status":1
  */
  "selected_finyr":1
};

class Store {
  constructor() {
    this.storeData = {};
    this.callBacks = {};
  }

  // Call this function to update store data. The data_id identifies the data
  // and you can use this from any component to access this piece of data
  updateStore = (data_id, state) => {
    let store_data = state === null ? null : JSON.parse(JSON.stringify(state));
    this.storeData[data_id] = store_data;
    if (data_id in cached_data_ids) {
      try {
        localStorage.setItem(data_id, JSON.stringify(store_data));
      } catch (err) {
        let loggedin_contact_id = localStorage.getItem("loggedin_contact_id");
        localStorage.clear();
        localStorage.setItem("isemptylocalstore", true);
        localStorage.setItem("loggedin_contact_id", loggedin_contact_id);
      }
    }
  };

  getStoreAllData = () => {
    // console.log(JSON.parse(JSON.stringify(this.storeData)));
    return JSON.parse(JSON.stringify(this.storeData));
  };
  // Usually called from the callback function to update the component state
  // using the store data and forcing re-render in case data has changed

  getStoreData = (data_id) => {
    // console.log(this.storeData);
    if (data_id in cached_data_ids) {
      let ret = localStorage.getItem(data_id);
      if (ret !== null) {
        ret = JSON.parse(ret);
      }
      // console.log(ret);
      return ret;
    }
    if (data_id in this.storeData) {
      // console.log(JSON.parse(JSON.stringify(this.storeData[data_id])));
      return JSON.parse(JSON.stringify(this.storeData[data_id]));
    } else return null;
  };
  getAllStoreData = () => {
    console.log(JSON.parse(JSON.stringify(this.storeData)));
    return JSON.parse(JSON.stringify(this.storeData));
  };

  registerCallBack = (data_id, callback, component_id = null) => {
    let key = component_id === null ? Utils.genKey(12) : component_id;
    //console.log.log("key",key);
    if (!(data_id in this.callBacks)) {
      this.callBacks[data_id] = {};
    }
    this.callBacks[data_id][key] = callback;
    return key;
  };

  deRegisterCallback = (data_id, component_id) => {
    if (data_id in this.callBacks && component_id in this.callBacks[data_id]) {
      delete this.callBacks[data_id][component_id];
    }
  };

}

export default new Store();
