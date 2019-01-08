const promiseChaining = (req, res, next) => {
    let rsp = {};
    const company = new Company({
        name: 'FullStackhour'
    });
    company.save()
        .then(savedCompany => {
            rsp.company = savedCompany;
            const job = new Job({
                title: 'Node.js Developer',
                _company: rsp.company._id
            });
            return job.save();
        })
        .then(savedJob => {
            const application = new Application({
                _job: savedJob._id,
                _company: rsp.company._id
            });
            rsp.job = savedJob;
            return application.save();
        })
        .then(savedApp => {
            const licence = new Licence({
                name: 'FREE',
                _application: savedApp._id
            });
            rsp.application = savedApp;
            return licence.save();
        })
        .then(savedLic => {
            rsp.licence = savedLic;
            return res.json(rsp);
        })
        .catch(err => {
            return next(err);
        })
}