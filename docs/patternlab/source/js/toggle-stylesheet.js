/*global jQuery*/
/*!
 * Toggle Stylesheet 1.0
 * 
 * include Button & Formfield in Patternlab. get current Stylesheet, change URL and insert
 * 
 * Date: 01.12.2017
 * Benedikt Scherer
 */
(function (w){
  var mandantForm = $('#change-mandant', window.parent.document);

  //
  // Include Button & Formfield
  //
  if (mandantForm.length === 0){
    $('#pl-pattern-nav-target', window.parent.document).append(
      '<div class="sg-current-size">\n' +
      '<label for="change-mandant">Mandant:</label>\n' +
      '<input type="text" class="sg-input" style="width: 85px;" id="change-mandant" placeholder="mymentoring"> \n' +
      '</div>'
    );
  }


  //
  // Click / Change Handler
  //
  $(window.parent.document).on('change', '#change-mandant', function (){
    updateMandant($(this).val());
  });


  //
  // Functions
  //
  var updateMandant = function (vanity){
    var $stylesheet = $('head link[data-toggle-stylesheet]');

    var linkPart = $stylesheet.attr('href').split('dist/css/');
    var cacheNumber = linkPart[1].split('.css');
    var newStylesheetLink = linkPart[0] + 'dist/css/' + vanity + '.min.css' + cacheNumber[1];

    $stylesheet.attr('href', newStylesheetLink);
  }
})(this);