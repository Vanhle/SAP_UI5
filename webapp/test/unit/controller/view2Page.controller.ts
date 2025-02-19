/*global QUnit*/
import Controller from "project2/controller/view2.controller";

QUnit.module("view2 Controller");

QUnit.test("I should test the view2 controller", function (assert: Assert) {
	const oAppController = new Controller("view2");
	oAppController.onInit();
	assert.ok(oAppController);
});