import { LightningElement, api } from 'lwc';

export default class ApiEndpoint extends LightningElement {
    @api name;
    @api status;
    @api description;
    @api docUrlKey;

    isLoading = false;
    responseData;
    error;

    @api
    reset() {
        this.responseData = undefined;
        this.error = undefined;
    }

    handleRequest() {
        this.isLoading = true;
        this.responseData = undefined;
        this.error = undefined;
    }

    handleResponse(event) {
        this.isLoading = false;
        this.responseData = undefined;
        this.error = undefined;
        if (event.detail) {
            const { data, error } = event.detail;
            if (data) {
                this.responseData = data;
            } else if (error) {
                this.error = error;
            } else {
                this.responseData = event.detail;
            }
        }
    }

    get nameWithStatus() {
        return this.status ? `${this.name} (${this.status})` : this.name;
    }

    get docUrl() {
        return `https://developer.salesforce.com/docs/component-library/documentation/lwc/${this.docUrlKey}`;
    }
}
