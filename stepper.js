(function() {
  'use strict';
  
  // Any variable starting with a '$' means that it must be an instance of jQuery.
  function Stepper($steps, $nextButton, $prevButton, finishedCallback) {
    this.$steps = $steps;
    this.$nextButton = $nextButton;
    this.$prevButton = $prevButton;
    this.finishedCallback = finishedCallback;
    
    if (this.$steps.length === 0) {
      throw new Error("The $steps parameter must contain at least one element!");
    }
    
    this.$currentStep = this.$steps.filter('[data-step="1"]');
    
    // OnClick Handlers
    this.$nextButton.on('click', this.clickedNextButton.bind(this));
    this.$prevButton.on('click', this.clickedPrevButton.bind(this));
  }
  
  Stepper.prototype.getStepByNumber = function(num) {
    return this.$steps.filter("[data-step='" + num + "']");
  }
  
  Stepper.prototype.getNextStep = function() {
    var nextStepNum = Number(this.$currentStep.data('step')) + 1,
        $nextStep = this.getStepByNumber(nextStepNum);
    
    if ($nextStep.length === 0) {
      return false;
    }
    
    return $nextStep;
  }
  
  Stepper.prototype.getPrevStep = function() {
    var prevStepNum = Number(this.$currentStep.data('step')) - 1,
        $prevStep = this.getStepByNumber(prevStepNum);
    
    if ($prevStep.length === 0) {
      return false;
    }
    
    return $prevStep;
  }
  
  Stepper.prototype.changeToNewStep = function($newStep) {
    this.$currentStep.fadeOut(function() {
      $newStep.fadeIn();
      this.$currentStep = $newStep;
    }.bind(this));
  }
  
  Stepper.prototype.clickedNextButton = function(e) {
    e.preventDefault();
    
    var $nextStep = this.getNextStep();
    
    if (!$nextStep) {
      return this.finishedCallback();
    }
    
    this.changeToNewStep($nextStep);
  }
  
  Stepper.prototype.clickedPrevButton = function(e) {
    e.preventDefault();
    
    var $prevStep = this.getPrevStep();
    
    if (!$prevStep) {
      return false;
    }
    
    this.changeToNewStep($prevStep);
  }
  
  window.Stepper = Stepper;
})();
