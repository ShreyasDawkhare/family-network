var editor = new $.fn.dataTable.Editor( {} ); // use a global for the submit and return data rendering in the examples

$(document).ready(function() {
    editor = new $.fn.dataTable.Editor( {
        ajax: {
            create: {
                type: 'POST',
                url:  '/people'
            },
            edit: {
                type: 'PUT',
                url:  '/people/:personId'
            },
            remove: {
                type: 'DELETE',
                url:  '/people/:personId'
            }
        },
        table: "#example",
        fields: [ {
                label: "First name:",
                name: "firstname"
            }, {
                label: "Last name:",
                name: "lastname"
            }, {
                label: "Gender:",
                name: "gender"
            }, {
                label: "Image URL",
                name: "imageurl"
            }
        ]
    } );

    $('#example').DataTable( {
        dom: "Bfrtip",
        ajax: "/people",
        columns: [
            { data: null, render: function ( data, type, row ) {
                // Combine the first and last names into a single table field
                return data.firstname+' '+data.lastname;
            } },
            { data: "gender" },
            { data: "imageurl" }
        ],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
    } );
} );
