# Curly braces and macros

Jira Markup interprets curly braces within double curly braces as a separate macro/placeholder and breaks the monospace block formatting.

Therefore, curly braces inside the text need to be escaped.

## Example

Source text:

```
* Check {{GET /api/users/{user}/show}} for a user with birthday_at populated.
* Check the birth date field name in the API response.
* Check the value passed in the {user} parameter.
```

In this form, the text will be rendered as follows:

```
* Check {{GET /api/users/ {user}

/show}} for a user with birthday_at populated.

* Check the birth date field name in the API response.
* Check the value passed in the {user}

parameter.
```

To prevent this, escape **SINGLE** curly braces inside the text by replacing `{` with `\{` and `}` with
`\}`:

```
* Check {{GET /api/users/\{user\}/show}} for a user with birthday_at populated.
* Check the birth date field name in the API response.
* Check the value passed in the \{user\} parameter.
```

Escaping result:

```
* Check GET /api/users/{user}/show for a user with birthday_at populated.
* Check the birth date field name in the API response.
* Check the value passed in the {user} parameter.
```

where `GET /api/users/{user}/show` is correctly rendered as an inline monospace block.
