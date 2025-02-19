sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("project2.controller.DynamicPageFreeStyle", {
        onInit: function () {
            var oModel = new JSONModel("../model/LogCollection.json");
            
            // Add console logs to track data loading
            oModel.attachRequestCompleted(function() {
                console.log("Data loaded successfully");
                console.log("Model Data:", oModel.getData());
            });

            oModel.attachRequestFailed(function(oEvent) {
                console.log("Data loading failed");
                console.log("Error:", oEvent.getParameter("responseText"));
            });

            oModel.loadData("../model/LogCollection.json");
            this.getView().setModel(oModel);
        },
        getPage: function () {
            return this.byId("dynamicPageId");
        },
        onToggleFooter: function () {
            this.getPage().setShowFooter(!this.getPage().getShowFooter());
        },
        toggleAreaPriority: function () {
            var oTitle = this.getPage().getTitle(),
                sDefaultShrinkRatio = oTitle.getMetadata().getProperty("areaShrinkRatio").getDefaultValue(),
                sNewShrinkRatio = oTitle.getAreaShrinkRatio() === sDefaultShrinkRatio ? "1.6:1:1.6" : sDefaultShrinkRatio;
            oTitle.setAreaShrinkRatio(sNewShrinkRatio);
        },
        onPressOpenPopover: function (oEvent) {
            var oView = this.getView(),
                oSourceControl = oEvent.getSource();

            if (!this._pPopover) {
                this._pPopover = Fragment.load({
                    id: oView.getId(),
                    name: "sap.f.sample.DynamicPageFreeStyle.view.Card"
                }).then(function (oPopover) {
                    oView.addDependent(oPopover);
                    return oPopover;
                });
            }

            this._pPopover.then(function (oPopover) {
                oPopover.openBy(oSourceControl);
            });
        },
        onHomePress: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView1");
        }
        
    });
});
