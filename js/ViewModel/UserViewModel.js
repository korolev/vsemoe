/**
 * Created by Lenovo on 09.11.13.
 */
var UserViewModel = function () {
    var self = this,
        validateEmail = function (email) {
            var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return re.test(email);
        };

    this.errorMessages = {
        password: {
            required: "Пожалуйста, введите пароль"
        },
        newpassword: {
            required: "Пожалуйста, введите пароль"
        },
        renewpassword: {
            required: "Пожалуйста, введите пароль",
            equalTo: "Введеные вами пароли не совпадают"
        },
        user: {
            email: "Пожалуйста, введите корректный Email",
            required: "Пожалуйста, введите логин"
        },
        passed: "Email и пароль не соотвествуют друг другу"
    };

    this.login = ko.observable("");//email
    this.email = ko.observable("");//email
    this.password = ko.observable("");
    this.repassword = ko.observable("");
    this.remember = ko.observable(true);

    this.loginError = ko.observable(false);
    this.emailError = ko.observable(false);
    this.passwordError = ko.observable(false);
    this.errorText = ko.observable("Логин и пароль не соответствуют друг другу");

    this.hasErrors = ko.computed(function () {
        return this.loginError() || this.emailError() || this.passwordError();
    }, this);

    this.loginValidate = function () {
        if(self.login().length){
            self.loginError(!validateEmail(self.login()));
            self.errorText("Пожалуйста, введите корректный Email");
        }else if(self.email().length){
          self.emailError(!validateEmail(self.email()));
          self.errorText("Пожалуйста, введите корректный Email");
        }else{
            self.loginError(false);
        }
    };
    
    this.passwor.subscribe(function(val){
        self.passwordError(false);
    });

  this.repasswordValidate = function(){

  };

  this.login.subscribe(function(val){
    self.loginError(false);
  });
  this.email.subscribe(function(val){
    self.emailError(false);
  });

    this.token = ko.observable();

    this.getLoginFromServer = function () {
        ServerApi.getUserByToken({}, function (r) {
            self.login(r[0].login);
        })
    };

    this.token.subscribe(function (val) {
        ServerApi.options.token = val;
        var currYear = (new Date()).getFullYear();
        if (self.remember()) {
            console.log("setcookie");
            setCookie(ApplicationSettings.cookieName, val, {expires: new Date([currYear * 1 + 1, 12, 30])});
        }
    });
};