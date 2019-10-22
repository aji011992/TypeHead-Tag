function autocomplete(inp, arr, arr1, arr2, row) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus_x, currentFocus_y, currentFocus_z, col_focus = -1;
  var row = row;


  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function(e) {
    // alert('Inside click'+this);
    // console.log("doc click "+e.target.id);
    // .target.id == "myInput1"
    if ((e.target.id.includes("myInput")) || (e.target.id.includes("-tag-")))
      return;
    closeAllLists();
  });
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    closeAllLists(e.target);
    removeAll();
    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      // console.log("calling focus");
      // window.setTimeout(function() {
      //   document.getElementById("myInput1").focus();
      // }, 0);
      // document.getElementById("myInput1").focus();
      // $('#myInput1').trigger('click');
      $(inp).trigger('click');
      return;
    }

    currentFocus_x = -1;
    currentFocus_y = -1;
    currentFocus_z = -1;
    var typehead_par_container = document.createElement("DIV");
    // typehead_par_container.setAttribute("id", this.id + "autocomplete-list-container");
    typehead_par_container.setAttribute("class", "autocomplete-item-container");
    /*create a DIV element that will contain the items (values):*/

    typehead_par_container.appendChild(create_typehead('function', arr, val));
    typehead_par_container.appendChild(create_typehead('relation', arr1, val));
    typehead_par_container.appendChild(create_typehead('value', arr2, val));


    document.getElementsByClassName("container-wrapper" + "-" + row.toString())[0].appendChild(typehead_par_container);

  });

  function drop_down_listener(e,  par_drop_node_id) {
    current_focus = 0;
    switch (par_drop_node_id) {
      case "function-autocomplete-list":
        current_focus = currentFocus_x ;
        break;
      case "relation-autocomplete-list":
        current_focus = currentFocus_y ;
        break;
      default:
        current_focus = currentFocus_z ;
        break;
    }

    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      current_focus++;

      /*and and make the current item more visible:*/
      current_focus = addActive(x, current_focus);
    }
    if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      current_focus--;
      /*and and make the current item more visible:*/
      current_focus = addActive(x, current_focus);
    }
    if (e.keyCode == 37) {
      // console.log("container left button");
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      removeActive(x);
      col_focus = col_focus - 1;
      if (col_focus < 0) col_focus = col_focus + 3;
      par_drop_node_id = navIdFinder();
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      current_focus = addActive(x, 0);
    }
    if (e.keyCode == 39) {
      // console.log("container right button");
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      removeActive(x);
      col_focus = col_focus + 1;
      if (col_focus >= 3) col_focus = col_focus - 3;
      par_drop_node_id = navIdFinder();
      var x = document.getElementById(par_drop_node_id);
      if (x) x = x.getElementsByTagName("div");
      current_focus = addActive(x, 0);
    }
    if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      // console.log("inside enter");
      e.preventDefault();
      var x = document.getElementById(navIdFinder());
      if (x) x = x.getElementsByTagName("div");
      if (current_focus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[current_focus].click();
        // $('#myInput1').trigger('click');
        $(inp).trigger('click');
      }
    }

    switch (par_drop_node_id) {
      case "function-autocomplete-list":
        currentFocus_x = current_focus;
        break;
      case "relation-autocomplete-list":
        currentFocus_y = current_focus;
        break;
      default:
        currentFocus_z = current_focus;
        break;
    }
  }

  inp.addEventListener("click", function(e) {
    // alert("inside focus");
    // console.log("inside click");
    // console.log(this.value);
    var a, b, i, val = this.value;
    if (val) {
      return;
    }
    closeAllLists(e.target);
    /*close any already open lists of autocompleted values*/
    removeAll();


    currentFocus_x = -1;
    currentFocus_y = -1;
    currentFocus_z = -1;
    var typehead_par_container = document.createElement("DIV");
    // typehead_par_container.setAttribute("id", this.id + "autocomplete-list-container");
    typehead_par_container.setAttribute("class", "autocomplete-item-container");
    /*create a DIV element that will contain the items (values):*/

    typehead_par_container.appendChild(create_def_typehead('function', arr, val));
    typehead_par_container.appendChild(create_def_typehead('relation', arr1, val));
    typehead_par_container.appendChild(create_def_typehead('value', arr2, val));

    document.getElementsByClassName("container-wrapper" + "-" + row.toString())[0].appendChild(typehead_par_container);
    // console.log(inp.parentElement.parentElement.parentElement).appendChild(typehead_par_container);
  });

  inp.addEventListener("focus", function(e) {
    // alert("inside focus");
    // console.log("inside focus");
    // console.log(e.target.id);

    var a, b, i, val = this.value;
    // console.log(this.value);
    if (val) {
      return;
    }
    closeAllLists(e.target);
    /*close any already open lists of autocompleted values*/
    removeAll();
    // if (!val) {
    //   return false;
    // }

    currentFocus_x = -1;
    var typehead_par_container = document.createElement("DIV");
    // typehead_par_container.setAttribute("id", this.id + "autocomplete-list-container");
    typehead_par_container.setAttribute("class", "autocomplete-item-container");
    /*create a DIV element that will contain the items (values):*/

    typehead_par_container.appendChild(create_def_typehead('function', arr, val));
    typehead_par_container.appendChild(create_def_typehead('relation', arr1, val));
    typehead_par_container.appendChild(create_def_typehead('value', arr2, val));

    document.getElementsByClassName("container-wrapper" + "-" + row.toString())[0].appendChild(typehead_par_container);
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    // var par_drop_node = $('.autocomplete-active').parent();
    var par_drop_node_id;
    var par_drop_node_cls = document.getElementsByClassName('autocomplete-active');
    // console.log(par_drop_node_cls);
    if (par_drop_node_cls.length > 0)
      par_drop_node_id = par_drop_node_cls[0].parentElement.id;
    var x = document.getElementById(par_drop_node_id);
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 8) {
      // alert("backspace");
      // alert("inp val "+this.value);
      if (!inp.value) {
        var temp_elem = "#tag-container-id-"+row.toString();
        temp_elem = temp_elem + " .tag-div";
        // $( "#tag-container-id-1 .tag-div").last().remove();
        $( temp_elem).last().remove();
      }
    } else { //up
      if(e.keyCode == 13)
        e.preventDefault();
      if(!par_drop_node_id)
        par_drop_node_id = "function-autocomplete-list";
      if(col_focus > -1)
        drop_down_listener(e,par_drop_node_id);
    }
  });


  function addActive(x, currentFocus) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    return currentFocus;
  }

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function navIdFinder() {
    switch (col_focus) {
      case 0:
        return "function-autocomplete-list";
        break;
      case 1:
        return "relation-autocomplete-list";
        break;
      default:
        return "value-autocomplete-list";
        break;
    }
  }

  function removeAll() {
    $('.autocomplete-item-container').remove();
  }

  function closeAllLists() {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    // var x = document.getElementsByClassName("autocomplete-items");
    // // console.log(x);
    // for (var i = 0; i < x.length; i++) {
    //   if (elmnt != x[i] && elmnt != inp) {
    //     x[i].parentNode.removeChild(x[i]);
    //   }
    // }
    $('.autocomplete-item-container').remove();
  }


  function create_typehead(type_typehead, arr, val) {
    col_focus = 0;
    var func_typehead_cont = document.createElement("DIV");
    var h6_tag = document.createElement('h6');
    h6_tag.innerHTML = type_typehead;
    func_typehead_cont.appendChild(h6_tag);
    func_typehead_cont.setAttribute("id", type_typehead + "-autocomplete-list");
    func_typehead_cont.setAttribute("class", type_typehead + "-autocomplete-items");
    func_typehead_cont.className = func_typehead_cont.className + " autocomplete-items";
    /*append the DIV element as a child of the autocomplete container:*/
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.id = type_typehead + "-tag-" + i.toString();
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/

          // $("#tag-container-id input").before(createTag(this.getElementsByTagName("input")[0].value));
          // $("#myInput1").before(createTag(this.getElementsByTagName("input")[0].value));
          $(inp).before(createTag(this.getElementsByTagName("input")[0].value));
          inp.value = "";
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
          // $('#myInput1').trigger('focus');
          $(inp).trigger('focus');
          return;
        });
        func_typehead_cont.appendChild(b);
      }
    }
    b = document.createElement("DIV");
    b.id = type_typehead + "-tag-" + "btn";
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "ADD";
    btn.className = "btn btn-xs";
    btn.id = type_typehead + "-tag-" + "ibtn";
    // b.innerHTML = "ADD";
    b.appendChild(btn);
    b.addEventListener("click", function(e) {
      // $("#myInput1").before(createTag(document.getElementById("myInput1").value));
      $(inp).before(createTag(inp.value));
      switch (e.target.id.substr(0, 1)) {
        case "f":
          function_tag.push(inp.value);
          break;
        case "v":
          value_tag.push(inp.value);
          break;
        default:
          relation_tag.push(inp.value);
          break;
      }
      inp.value = "";
      closeAllLists();
      // $('#myInput1').trigger('click');
      // document.getElementById("myInput1").click();
      inp.click();
      // return;
    });
    func_typehead_cont.appendChild(b);
    return func_typehead_cont;
  }

  function create_def_typehead(type_typehead, arr, val) {
    col_focus = 0;
    var func_typehead_cont = document.createElement("DIV");
    var h6_tag = document.createElement('h6');
    h6_tag.innerHTML = type_typehead;
    func_typehead_cont.appendChild(h6_tag);
    func_typehead_cont.setAttribute("id", type_typehead + "-autocomplete-list");
    func_typehead_cont.setAttribute("class", type_typehead + "-autocomplete-items");
    func_typehead_cont.className = func_typehead_cont.className + " autocomplete-items";
    /*append the DIV element as a child of the autocomplete container:*/
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.id = type_typehead + "-tag-" + i.toString();
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          // inp.value = this.getElementsByTagName("input")[0].value;
          // document.getElementById("tag-container-id").appendChild(createTag(this.getElementsByTagName("input")[0].value));
          inp.innerHTML = "";
          // $("#tag-container-id input").before(createTag(this.getElementsByTagName("input")[0].value));
          // $("#myInput1").before(createTag(this.getElementsByTagName("input")[0].value));
          $(inp).before(createTag(this.getElementsByTagName("input")[0].value));
          /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
          closeAllLists();
          // inp.focus();
          // $('#myInput1').trigger('focus');
          $(inp).trigger('focus');
        });
        func_typehead_cont.appendChild(b);
      }
    }

    return func_typehead_cont;
  }

  function createTag(label) {
    var div = document.createElement('DIV');
    div.className = 'tag-div';
    var span = document.createElement('SPAN');
    span.innerHTML = label;
    span.className = "tag label label-info";

    div.appendChild(span);
    return div;
  }


}
