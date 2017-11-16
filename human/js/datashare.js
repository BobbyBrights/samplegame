app.service("painData", function () {

var _data = {};

return {
    getPain: function () {
        return _data;
    },
    setPain: function (value) {
        _data = value;
    }
};

});