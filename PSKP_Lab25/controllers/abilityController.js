class AbilityController {
    async getAllRules(request, response) {
        response.status(200).send(request.ability.rules);
    }
}

module.exports = new AbilityController();
