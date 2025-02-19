sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            // Load JSON model
            var oModel = new JSONModel("../model/data.json");
            this.getView().setModel(oModel, "loginData");
        },
        onNavToView2: function() {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteView2");
        },
        onSearch: function(oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oTable = this.getView().byId("loginTable");
            var oBinding = oTable.getBinding("items");
            
            var aFilters = [];
            if (sQuery) {
                var oFilterAccount = new Filter("account", FilterOperator.Contains, sQuery);
                var oFilterIP = new Filter("ip", FilterOperator.Contains, sQuery);
                aFilters.push(new Filter([oFilterAccount, oFilterIP], false));
            }
            
            oBinding.filter(aFilters);
        }
    });
});
