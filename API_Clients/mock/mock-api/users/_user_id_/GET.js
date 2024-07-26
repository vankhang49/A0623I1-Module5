module.exports = function(request, response) {
    let users = require("../GET.json");

    let user = users.find(user => user.id == request.params.user_id);

    response.json({
        id: user.id,
        name: user.name
    });
};