<template>
  <div class="flex xs12 sm6">
    <div class="v-card v-sheet theme--light elevation-1">
      <v-form>
        <v-alert v-model="ui.hasInfo" type="info">{{ ui.hasInfoText }}</v-alert>
        <v-alert v-model="ui.hasWarning" type="warning">{{ ui.hasWarningText }}</v-alert>
        <v-alert v-model="ui.hasError" type="error">{{ ui.hasErrorText }}</v-alert>

        <v-container>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <h3 class="display-1">Customer Addresses</h3>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-text-field
                label="Customer ID"
                v-model="customer.customerId"
                placeholder="Enter a customer id between 1 and 5 and click 'import' below"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 md12>
              <v-btn color="info" v-on:click.native="loadCustomer">Load customer data</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import getBestCustomerById from '../graphql/getBestCustomerById.gql'

export default {
  name: 'Home',
  data () {
    return {
      ui: {
        hasInfo: false,
        hasInfoText: '',
        hasError: false,
        hasErrorText: '',
        hasWarning: false,
        hasWarningText: ''
      },
      customer: {
        customerId: 1,
        firstname: '',
        lastname: '',
        email: '',
        address1: '',
        address2: '',
        address3: '',
        address4: '',
        state: '',
        postcode: ''
        // hasOtherAddresses: false,
        // otherAddresses: []
      },
      excelErrorCount: 0
    }
  },

  methods: {
    loadCustomer: function () {
      this.clearAlerts()
      try {
        this.$apollo
          .query({
            query: getBestCustomerById,
            fetchPolicy: 'no-cache',
            variables: {
              customerId: this.customer.customerId
            }
          })
          .then(data => {
            if (data.data.getBestCustomerById.id == null) {
              this.setInfo('Customer not found')
            } else {
              this.customer.firstname = data.data.getBestCustomerById.givenName
              this.customer.lastname = data.data.getBestCustomerById.familyName
              this.customer.email = data.data.getBestCustomerById.email
              this.customer.address1 = data.data.getBestCustomerById.currentAddress.address1
              this.customer.address2 = data.data.getBestCustomerById.currentAddress.address2
              this.customer.address3 = data.data.getBestCustomerById.currentAddress.address3
              this.customer.address4 = data.data.getBestCustomerById.currentAddress.address4
              this.customer.state = data.data.getBestCustomerById.currentAddress.state
              this.customer.postcode = data.data.getBestCustomerById.currentAddress.postCode
              this.customer.agencyId = data.data.getBestCustomerById.personIdentity.identifiers[0].agencyId
              this.customer.lastUpdated = new Date(data.data.getBestCustomerById.lastUpdated)
              // this.customer.previousAddresses = data.data.getBestCustomerById.previousAddresses
              this.setInfo('Customer loaded')
              this.excelLoadCustomer()
            }
          })
          .catch(err => {
            this.setError(`Unexpected error : ${err}`)
          })
      } catch (e) {
        this.setError(`Cannot find customer : ${e}`)
      }
    },

    excelLoadCustomer: function () {
      // wrap in array because excel needs it like this for ranges
      var columnHeadings = [
        [ 'Agency Id',
          'Customer Id',
          'First name',
          'Last name',
          'Email',
          'Address 1',
          'Address 2',
          'Address 3',
          'Address 4',
          'Postcode',
          'State' ], // headings
        [ this.customer.agencyId,
          this.customer.customerId,
          this.customer.firstname,
          this.customer.lastname,
          this.customer.email,
          this.customer.address1,
          this.customer.address2,
          this.customer.address3,
          this.customer.address4,
          this.customer.postcode,
          this.customer.state ] // values
      ]
      window.Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange().getResizedRange(columnHeadings.length - 1, columnHeadings[0].length - 1)
        range.values = columnHeadings
        range.format.autofitColumns()
        await context.sync()
      }).catch(this.excelError)
    },

    excelError: function (err) {
      this.excelErrorCount++
      if (this.excelErrorCount === 1) {
        window.Excel.run(async (context) => {
          var sheet = context.workbook.worksheets.getActiveWorksheet()
          var range = sheet.getRange('A1:A1')
          range.select()
          await context.sync()
        }).catch(this.excelError)
      } else {
        this.setError(`Cannot find customer : ${JSON.stringify(err)}`)
      }
    },

    setInfo: function (infoText) {
      if (infoText) {
        this.ui.hasInfoText = infoText
        this.ui.hasInfo = true
      } else {
        this.ui.hasInfoText = ''
        this.ui.hasInfo = false
      }
    },

    setWarning: function (text) {
      if (text) {
        this.ui.hasWarningText = text
        this.ui.hasWarning = true
      } else {
        this.ui.hasWarningText = ''
        this.ui.hasWarning = false
      }
    },

    clearAlerts: function () {
      this.setError()
      this.setInfo()
      this.setWarning()
      this.customer.hasOtherAddresses = false
      this.customer.otherAgencyCurrentAddresses = []
    },

    setError: function (errorText) {
      if (errorText) {
        this.ui.hasErrorText = errorText
        this.ui.hasError = true
      } else {
        this.ui.hasErrorText = ''
        this.ui.hasError = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
