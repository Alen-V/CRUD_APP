export const FormItems = [{
        el: 'input',
        item: 'name',
        text: 'Name'
    },{
        el: 'input',
        item: 'surname',
        text: 'Surname'
    },{
        el: 'input',
        item: 'id',
        text: 'National ID'
    },{
        el: 'select',
        item: 'sex',
        text: 'Sex'
    },{
        el: 'input',
        item: 'area',
        text: 'Area'
    },{
        el: 'select',
        item: 'region',
        text: 'Region'
    },{
        el: 'select',
        item: 'age',
        text: 'Age'
    },{
        el: 'input',
        item: 'municipality',
        text: 'Municipality'
    },{
        el: 'input',
        item: 'address',
        text: 'Address'
    },{
        el: 'input',
        type: 'email',
        item: 'email',
        text: 'Email'
    },{
        el: 'select',
        item: 'ethnicity',
        text: 'Ethnicity'
    },{
        el: 'select',
        item: 'education',
        text: 'Education'
    },{
        el: 'input',
        item: 'phoneNumber',
        text: 'Phone Number'
    },{
        el: 'select',
        item: 'societalStatus',
        text: 'Social Status'
    },{
        el: 'input',
        item: 'religion',
        text: 'Religion'
    },{
        el: 'input',
        item: 'nFamily',
        text: 'Family Members'
    },{
        el: 'select',
        item: 'monthlyIncome',
        text: 'Monthly Income'
    },{
        el: 'select',
        item: 'health',
        text: 'Health Condition'
    },{
        el: 'input',
        item: 'maritalStatus',
        text: 'Marital Status'
    },{
        el: 'input',
        item: 'sexOrientation',
        text: 'Sexual Orientation'
    },{
        el: 'select',
        item: 'field',
        text: 'Field'
    },{
        el: 'textarea',
        item: 'problem',
        text: 'Problem'
    },{
        el: 'textarea',
        item: 'advice',
        text: 'Advice'
    },{
        el: 'input',
        type: 'date',
        item: 'noticeDate',
        text: 'Date of notice'
    },{
        el: 'input',
        type: 'date',
        item: 'submissionDate',
        text: 'Date of submission'
    },{
        el: 'select',
        item: 'waitPeriod',
        text: 'Waiting Period'
    },{
        el: 'input',
        type: 'radio',
        item: 'resolution',
        text: 'Resolution'
    },{
        el: 'input',
        type: 'radio',
        item: 'status',
        text: 'Status'
    }
]

export const selectOptions = {
    sex: ['', 'Male', 'Female', 'Other'],
    region: ['', 'Region_1', 'Region_2', 'Region_3', 'Region_4', 'Region_5'],
    age: ['', '18-', '18-25', '26-50', '50+'],
    ethnicity: ['', 'American', 'English', 'Polish', 'Japanese', 'Korean', 'Italian'],
    education: ['', 'Primary', 'High School', 'Higher'],
    societalStatus: ['', 'Employed', 'Unemployed', 'Welfare'],
    health: ['', 'Good', 'Bad'],
    maritalStatus: ['', 'Married', 'Divorced', 'Neither'],
    field: ['', 'Welfare Protection', 'Social Protection', 'Child Protective Services', 'Pension', 'Health Insurance', 'Other'],
    monthlyIncome: ['', '15.000 $', '16.000 $ to 30.000 $', '30.000 $ to 50.000 $', 'over 50.000 $'],
    waitPeriod: ['', '15 days', '15 to 30 days', '1 to 3 months', '3 to 6 months', 'over 6 months'],
}

export const radioOptions = {
    resolution: ['Positive', 'Negative'],
    status: ['Active', 'Finished/Archived'],
    resolutionVal: {
        Positive: true,
        Negative: false
    },
    statusVal: {
        Active: true,
        'Finished/Archived': false
    }
}

export const ServerlessItems = {
    docs: [{
        fields: {
            name: 'test',
            surname: 'one'
        },
        createdBy: 'Alen-V', 
        createdAt: 'Now', 
        updatedAt: ''
    }]
}