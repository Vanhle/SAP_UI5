import BaseComponent from "sap/ui/core/UIComponent";
import ODataModel from 'sap/ui/model/odata/v2/ODataModel';

/**
 * @namespace project2
 */
export default class Component extends BaseComponent {

    public static metadata = {
        manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
    };

    public init() : void {
        super.init();

        // Tạo model OData với thông tin xác thực
        // const oDataModel = new ODataModel("https://s35.gb.ucc.cit.tum.de/sap/opu/odata/sap/ZL253_TEST_SM20_SEGW_SRV/SalogSet?$top=10&$skip=50&$format=json", {
        //     json: true,
        //     useBatch: false,
        //     headers: {
        //         "Authorization": "Basic " + btoa("LEARN-256" + ":" + "mich123321")
        //     }
        // });

        // Thiết lập model OData
        // this.setModel(oDataModel);

        // Enable routing
        this.getRouter().initialize();
    }
}