/**
 * Created by mk-sfdev on 1/13/14.
 */

var TransactionViewModel = function (data, app) {

    var self = this;

    this.id = data.transaction_id;
    this.from_id = data.from_id;
    this.to_id = data.to_id;
    this.description = data.description;
    this.comment = data.comment;
    this.split = data.split;
    this.amount = data.amount;
    this.currency = data.currency_id;
    this.created = moment.unix(data.created);
    this.deleted = ko.observable(data.deleted | 0);
    this.finished = data.finished | 0;
    this.hidden = data.hidden | 0;

    this.template = data.template | 0;
    this.template_id = data.template_id;

    this.editInstance = ko.observable();

    this.removeInstance = function(){
        app.transactionEdit().editMode(true);
        self.editInstance(false);
    };

    this.editRecord = function () {
        $.each(app.transactionsSet(),function(k,tr){
            tr.removeInstance && tr.removeInstance();
        });
        app.transactionEdit().editMode(false);
        self.editInstance(new TransactionEditViewModel(self, app, function (obj,r) {
            var uw = ko.utils.unwrapObservable;
            self.amount = uw(obj.amount);
            self.comment = uw(obj.comment);
            self.created = moment.unix(uw(obj.created));
            self.from_id = uw(obj.from_id);
            self.to_id = uw(obj.to_id);
            self.currency = uw(obj.currency_id);
            console.log(self);
            self.removeInstance();
            console.log(obj);
            console.log(r);
        }));
    };


    this.restoreRecord = function () {
        self.deleted(0);
    };
    this.removeRecord = function () {
        console.log(arguments);
        self.deleted(1);
    };
    self.deleted.subscribe(function (val) {
        ServerApi.updateTransaction('deleted', {transaction_id: self.id, value: val}, function (r) {
            console.log(r);
        });
    });

};
