class User {
    User(username, emailAddress) {
        this.username = username;
        this.emailAddress = emailAddress;
    }

    static getUsername() { return username }
    static setName(username) {this.username = username;}

    static getEmailAddress() {return emailAddress;}
    static setEmailAddress(emailAddress) {this.emailAddress = emailAddress;}

}