import { Component, Vue, Prop } from "vue-property-decorator";
import "./table-demo.scss";

@Component({
  template: require("./table-demo.html")
})
export class TableComponent extends Vue {
  // Table 1
  fields = [
    {
      key: "id",
      label: "Id",
      colType: "span"
    }, {
      key: "name",
      label: "Name",
      colType: "button"
    }, {
      key: "uhh",
      label: "uhh..",
      colType: "idk"
    }];
  items = [
    {
      id: 0,
      name: "Test 0"
    }, {
      id: 1,
      name: "Test 1"
    }, {
      id: 2,
      name: "Test 2"
    }
  ];

  // Table 2
  fields1 = [
    // A virtual column that doesn't exist in items
    'index',
    // A column that needs custom formatting
    { key: 'name', label: 'Full Name' },
    // A regular column
    'age',
    // A regular column
    'sex',
    // A virtual column made up from two fields
    { key: 'nameage', label: 'First name and age' }
  ];
  items1 = [
    { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
    { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
    { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
    { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 }
  ];

  // Table 3
  fields2= ['first_name', 'last_name', 'show_details'];
  items2 = [
    { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
    {
      isActive: false,
      age: 89,
      first_name: 'Geneva',
      last_name: 'Wilson',
      _showDetails: true
    },
    { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
  ]
}