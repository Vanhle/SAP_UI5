sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("project2.controller.View1", {
        onInit: function () {
            // Lấy model OData từ Component
            var oModel = this.getOwnerComponent().getModel("salog");

            // Đặt một hàm callback để xử lý dữ liệu khi nó được lấy
            oModel.read("/SalogSet", {
                success: function (oData) {
                    // Xử lý dữ liệu thành công
                    var aResults = oData.results.map(function(item) {
                        return {
                            Indx: item.Indx,
                            SalDate: new Date(parseInt(item.SalDate.replace(/\/Date\((\d+)\)\//, '$1'))), // Chuyển đổi định dạng ngày
                            SalTime: item.SalTime,
                            Slguser: item.Slguser
                        };
                    });

                    // Cập nhật model mới với dữ liệu đã xử lý
                    var oNewModel = new sap.ui.model.json.JSONModel({ results: aResults });
                    this.getView().setModel(oNewModel, "logData");
                }.bind(this), // Bind this để sử dụng trong callback
                error: function (oError) {
                    // Xử lý lỗi
                    MessageToast.show("Lỗi khi lấy dữ liệu từ OData service");
                    console.error(oError);
                }
            });
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
                var oFilterIndx = new sap.ui.model.Filter("Indx", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilterSalDate = new sap.ui.model.Filter("SalDate", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilterSalTime = new sap.ui.model.Filter("SalTime", sap.ui.model.FilterOperator.Contains, sQuery);
                var oFilterSlguser = new sap.ui.model.Filter("Slguser", sap.ui.model.FilterOperator.Contains, sQuery);
                aFilters.push(new sap.ui.model.Filter([oFilterIndx, oFilterSalDate, oFilterSalTime, oFilterSlguser], false));
            }
            
            oBinding.filter(aFilters);
        }
    });
});
