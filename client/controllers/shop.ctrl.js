angular
    .module('randomino')
    .controller('ShopCtrl', ShopCtrl);



function ShopCtrl($scope, $reactive) {


    $reactive(this).attach($scope);


    $scope.helpers({
        products: () => {
            var products = Products.find({}, {
                sort: {
                    "rank": 1
                }
            }).fetch();
            
            
            // Adding advertising in the products Stream .

            var add = {
                id: 1,
                image: "/ads/bannerShort.jpg",
                name: "Add",
                desc: "An iconic <br/>watch family, the L.12.12 watch captures and transforms the essence of the polo shirt into a watch collection.<br/>Red Silicone Strap With Red Dial<br/>Buckle Closure<br/>Tr90 Composite Material & Red Silicone Case<br/>Quartz Movement<br/>2 Year Limited Warranty & 24-36 Months Approximate Battery Life",
                ads : true
            }
            
            products.splice(3, 0, add)
            products.splice(6, 0, add)
            return products;

        }
    });

    $scope.imagex = function (id) {

        var ImageObj = Images.files.findOne(id)

        if (ImageObj) {
            return ImageObj.url({

            })

        };

    };


}