# formAutoFiller
**formAutoFiller** targets input elements by the name attribute and replaces the value of the input as per the provided dictionary. By default it does not overwrite pre-filled values

## usage
1. Include `jquery.formAutoFiller.js` or `jquery.formAutoFiller.min.js`
```
<script src="/js/jquery.formAutoFiller.min.js"></script>
```

2. Call the function `$('form').formAutoFiller();`
```
	$('form').formAutoFiller({
		replaceOld: true,
		dictionary: {
			'first_name': 'Guy',
			'last_name': 'Testing',
			'email_confirm': 'test@testguy.com',
			'phone': '1234567890'
		}
	});
```

## options
**replaceOld** - boolean - `replaceOld: false`
- Default is set to *false*
- If set to true, formAutoFiller will replace existing values, otherwise it will only fill empty inputs.

**dictionary** - object - `dictionary: {'first_name' : 'Guy'}`
- *key* - should match the *name* attribute of the input to autofill
- *value* - the value you want to autofill 
