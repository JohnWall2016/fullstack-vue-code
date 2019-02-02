const InputForm = { 
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label>New Item</label>
          <input v-model="fields.newItem" type="text"
            placeholder="Add an item!" />
          <span style="float: right">{{ fields.newItem.length }}/20</span>
          <span style="color: red">{{ fieldErrors.newItem }}</span>
          <span v-if="isNewItemInputLimitExceeded"
            style="color: red; display: block">
            Must be under twenty characters
          </span>
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text"
            placeholder="What's your email?" />
          <span style="color: red">{{ fieldErrors.email }}</span>
        </div>
        <div class="field">
          <label>Urgency</label>
          <select v-model="fields.urgency" class="ui fluid search dropdown">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
          <span style="color: red">{{ fieldErrors.urgency }}</span>
          <span v-if="isNotUrgent"
            style="color: red; display: block">
            Must be moderate to urgent
          </span>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndConditions" type="checkbox" />
            <label>I accept the terms and conditions</label>
            <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>
        <button :disabled="isNewItemInputLimitExceeded || isNotUrgent"
          class="ui button">
          Submit
        </button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul>
          <li v-for="item in items" class="item">{{ item }}</li>
        </ul>
      </div>
    </div>`,
  data() {
    return {
      fields: {
        newItem: '',
        email: '',
        urgency: '',
        termsAndConditions: false
      },
      fieldErrors: {
        newItem: undefined,
        email: undefined,
        urgency: undefined,
        termsAndConditions: undefined
      },
      items: []
    }
  },
  computed: {
    isNewItemInputLimitExceeded() {
      return this.fields.newItem.length >= 20;
    },
    isNotUrgent() {
      return this.fields.urgency === 'Nonessential';
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);
      if (Object.keys(this.fieldErrors).length) return;

      this.items.push(this.fields.newItem);
      this.fields.newItem = '';
      this.fields.email = '';
      this.fields.urgency = '';
      this.fields.termsAndConditions = false;
    },
    validateForm(fields) {
      const errors = {};
      if (!fields.newItem) errors.newItem = "New Item Required";
      if (!fields.email) errors.email = "Email Required";
      if (!fields.urgency) errors.urgency = "Urgency Required";
      if (!fields.termsAndConditions) {
        errors.termsAndConditions = "Terms and conditions have to be approved";
      }

      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = "Invalid Email";
      }

      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }
}

new Vue({
  el: '#app',
  components: {
    'input-form': InputForm
  }
})
