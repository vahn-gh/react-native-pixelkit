# react-native-pixelkit

A simple pixel UI library

> [!WARNING]
> This library is in active development and is **not published to npm yet**. The API may change without notice.

## Trying it out

Clone the repository, install dependencies and run the example app:

```sh
yarn
yarn example ios # or: yarn example android
```

See [Development workflow](CONTRIBUTING.md#development-workflow) for more details.


## Usage


```js
import { PixelBox } from 'react-native-pixelkit';

// ...

<PixelBox options={{ backgroundColor: '#4caf50', bevel: true }}>
  <Text>Hello</Text>
</PixelBox>;
```


## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
