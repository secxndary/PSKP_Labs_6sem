class AbilityController {
    async getAllRules(req, res) {
        res.status(200).send(req.ability.rules);
    }
}

module.exports = new AbilityController();
