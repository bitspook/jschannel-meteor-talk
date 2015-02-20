(function () {
  var Binder = function () {
    this.models = [];
    this.modelDeps = {};

    this.setupAllModels();
    this.setupAutoruns();
  };

  Binder.prototype.setupAllModels = function () {
    var self = this;
    this.modelNodes= document.querySelectorAll('[omg-model');

    for(var i = 0; i < this.modelNodes.length; i++) {
      var node = this.modelNodes[i],
          modelName = node.getAttribute('omg-model');

      this.models.push(modelName);
      this.modelDeps[modelName] = new Tracker.Dependency;

      node.addEventListener('keydown', function (e) {
        self.modelDeps[modelName].changed();
      })
    }
  };

  Binder.prototype.setupAutoruns = function () {
    var self = this;
    this.models.forEach(function (model) {
      Tracker.autorun(function (stop) {
        self.modelDeps[model].depend();

        self.updateModelOutputs(model, document.querySelector('[omg-model').value);
      });
    });
  };

  Binder.prototype.updateModelOutputs = function (model, value) {
    var allNodes = document.getElementsByClassName(model);

    for(var i = 0; i < allNodes.length; i++) {
      allNodes[i].innerHTML = value;
    }
  };

  window.OMGBinder = new Binder;
})();