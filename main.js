//swat
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn ms-3 btn-success",
    cancelButton: "btn  btn-danger",
  },
  buttonsStyling: false,
});
//swal error
function Error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
}

//inputs
var getbynameinput = $("#getbynameinput");

var createnameinput = $("#createnameinput");
var createurlinput = $("#createurlinput");

var updateidinput = $("#updateidinput");
var updatenameinput = $("#updatenameinput");
var updateurlinput = $("#updateurlinput");

//btns
var getbynamebtn = $("#getbynamebtn");
var createbtn = $("#createbtn");
var updatebyidbtn = $("#updatebyidbtn");

//URL
var mainurl = "http://localhost:29987/api/Actors/";

//getbyid //getall
getbynamebtn.click(function () {
  $("#results").html("");
  var val = getbynameinput.val();
  $.ajax({
    url: `${mainurl}${val}`,
    error: function () {
      Error();
    },
    success: function (result) {
      if (result.length == 0) {
        Swal.fire({
          title: "Cant find any actor with this name",
          icon: "warning",
        });
      }
      result.forEach((r) => {
        $("#results").append(
          `
                <div class="col-lg-4">
                <div class="card" >
    <img src="${r.url}" class="card-img-top w-100" style="height:20vh" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center">${r.id}|${r.name}</h5>
      <div class="d-flex justify-content-between">
      <button class="btn btn-primary" onclick="Delete(${r.id})">Delete</button>
      <button class="btn btn-primary" onclick="Update(${r.id},'${r.name}','${r.url}')">Update</button>
      
      </div>
    </div>
  </div>
  </div>
                `
        );
      });
    },
  });
});

//delete
function Delete(val) {
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `${mainurl}${val}`,
          type: "DELETE",
          error: function () {
            Error();
          },
          success: function () {
            Swal.fire({
              icon: "success",
              title: "You deleted actor",
            });
            getbynamebtn.click();
          },
        });
      }
    });
}

//create
createbtn.click(function () {
  var name = createnameinput.val();
  var url = createurlinput.val();
  if (name == "" || url == "") {
    alert("Must fill inputs");
    return;
  }
  $.ajax({
    url: mainurl,
    type: "POST",
    data: JSON.stringify({ name, url }),
    dataType: "json",
    contentType: "application/json",

    statusCode: {
      404: function () {
        Swal.fire({
          icon: "warning",
          title: "Not Found",
        });
      },
      400: function () {
        Swal.fire({
          icon: "warning",
          title: "Bad Request" + name,
        });
      },
      200: function () {
        Swal.fire({
          icon: "success",
          title: "You Created Actor:" + name,
        });
        getbynamebtn.click();
      },
    },
  });
});

//put
function Update(id, name, url) {
  var id = updateidinput.val(id);
  var name = updatenameinput.val(name);
  var url = updateurlinput.val(url);
}

updatebyidbtn.click(function () {
  var id = updateidinput.val();
  var name = updatenameinput.val();
  var url = updateurlinput.val();
  if (isNaN(id) || id == "") {
    alert("Id must be number");
    return;
  }
  $.ajax({
    url: `${mainurl}${id}`,
    type: "Put",
    data: JSON.stringify({ name, url }),
    dataType: "json",
    contentType: "application/json",
    statusCode: {
      404: function () {
        Swal.fire({
          icon: "error",
          title: "Not Found"
        });
      },
      400: function () {
        Swal.fire({
          icon: "error",
          title: "Bad Request"
        });
      },
      200: function () {
        Swal.fire({
          icon: "success",
          title: "You updated Actor"
        });
        getbynamebtn.click();
      },
    },
  });
});
