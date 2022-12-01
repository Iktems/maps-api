let map;

// let lat = 50.849813715570065;
// let lng = 4.3527577995273985;
function initMap() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;


            let maposition = [];
            let marker = [];
            let infowindow = [];
            let infowindows = [];
            let icon = '';
            let icon_loc = '';
            var title = [];
            // let i = 1;

            map = new google.maps.Map(document.getElementById("map"), {
                center: {
                    lat: lat,
                    lng: lng
                },
                zoom: 14,
                styles: [{
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#ff0000"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "visibility": "on"
                        }]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#F1FF00"
                            },
                            {
                                "saturation": -27.4
                            },
                            {
                                "lightness": 9.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#9FFF00"
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#0099FF"
                            },
                            {
                                "saturation": -20
                            },
                            {
                                "lightness": 36.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#00FF4F"
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#FFB300"
                            },
                            {
                                "saturation": -38
                            },
                            {
                                "lightness": 11.2
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                                "hue": "#00B6FF"
                            },
                            {
                                "saturation": 4.2
                            },
                            {
                                "lightness": -63.4
                            },
                            {
                                "gamma": 1
                            }
                        ]
                    }
                ]
            });

            icon = {
                url: "src/img/icon.png", // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
            };

            icon_loc = {
                url: "src/img/location.png", // url
                scaledSize: new google.maps.Size(40, 40), // scaled size
            };



            $.ajax({
                url: 'https://opendata.bruxelles.be/api/records/1.0/search/?dataset=musees-a-bruxelles&q=&rows=40',
                type: 'GET', // Le type de la requête HTTP, ici  GET
                data: {
                    // nom: nom, 
                    // prenom: prenom, 
                    // genre: genre
                }, // On fait passer nos variables au script coucou.php
                dataType: 'json',
                // 5) fonction à effectuer en cas de succès
                success: function (monArray) { //  contient le HTML renvoyé
                    console.log(monArray.records);
                    var html = '';

                    marker = new google.maps.Marker({
                        position: {
                            lat,
                            lng
                        },
                        map: map,
                        title: "Je me trouve ici !",
                        icon: icon_loc
                    });

                    // infowindows = new google.maps.InfoWindow({
                    //     content: '<h1>Ma localisation</h1>',
                    //     ariaLabel: "Uluru",
                    // }); //infowindows


                    monArray.records.forEach(function (ligne, i) {
                        // console.log(i);
                        maposition[i] = {
                            lat: ligne.geometry.coordinates[1],
                            lng: ligne.geometry.coordinates[0]
                        };

                        marker[i] = new google.maps.Marker({
                            position: maposition[i],
                            map: map,
                            title: ligne.fields.nom_du_musee,
                            icon: icon
                        });

                        infowindow[i] = new google.maps.InfoWindow({
                            content: '<h1>' + ligne.fields.nom_du_musee + '</h1><p id="para">' + ligne.fields.adresse + '</p><div id="cnt"><p>' + ligne.fields.code_postal_postcode + '</p><p>' + ligne.fields.commune_gemeente + '</p></div><div id="para"><span>Site web :</span><a> ' + ligne.fields.site_web_website + '</a></div><div id="mail"><span>E-mail :</span> ' + ligne.fields.e_mail + '</div>',
                            ariaLabel: "Uluru",
                        }); //infowindows

                        marker[i].addListener("click", () => {
                            for (let ii = 0; ii < monArray.records.length; ii++) {
                                if (infowindow[ii]) {
                                    infowindow[ii].close();
                                    $('.place').removeClass('actif');
                                }
                            }
                            infowindow[i].open({
                                anchor: marker[i],
                                map: map,
                            });

                            $('.place').parent().parent().removeClass('actif');
                            $('#id_' + i).parent().parent().addClass('actif');

                        }); //addlistener

                        html += '<div class="message-box"><div class="message-content"><p><a href="" class="place message-line" id="id_' + i + '" data-id="' + i + '">' + ligne.fields.nom_du_musee + '</a></p></div></div>'
                    }); // foreach

                    $('#contenu').html(html);
                    $('.place').click(function (e) {
                        e.preventDefault();

                        $('.place').parent().parent().removeClass('actif');
                        $(this).parent().parent().addClass('actif');

                        var i = $(this).attr('data-id');
                        // console.log(i);

                        for (let ii = 0; ii < monArray.records.length; ii++) {
                            if (infowindow[ii]) {
                                infowindow[ii].close();

                            }
                        }

                        infowindow[i].open({
                            anchor: marker[i],
                            map: map,
                        });
                    })


                } // success
            }); // intro ajax function


        })
    } //fin init map
}
window.initMap = initMap;


//*  *   MODE SOMBRE   * *//
document.addEventListener('DOMContentLoaded', function () {
    var modeSwitch = document.querySelector('.mode-switch');

    modeSwitch.addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');
        modeSwitch.classList.toggle('active');
    });
});