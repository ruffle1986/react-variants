import test from 'tape';
import dom from 'cheerio';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import Variants from './variants';

test('components - variants', (assert) => {
  let $ = dom.load(render(<Variants />));
  assert.equal(
    $('.variants-add-option').length,
    1,
    'it should render the `add option` button if option limit is not set'
  );

  $ = dom.load(render(<Variants optionsLimit={ 2 } />));
  assert.equal(
    $('.variants-add-option').length,
    1,
    `it should render the \`add option\` button if the option limit is set
    but not reached`
  );

  const options = [
    { id: 1, name: 'foo', values: ['foobar'] },
    { id: 2, name: 'bar', values: ['barbaz'] },
  ];
  $ = dom.load(render(<Variants optionsLimit={ 2 } options={ options } />));
  assert.equal(
    $('.variants-add-option').length,
    0,
    `it should not render the \`add option\` button
    if the option limit is reached`
  );

  $ = dom.load(render(<Variants optionsLimit={ 2 } options={ [] } />));
  assert.equal(
    $('.variants-options').length,
    0,
    'there`s nothing to be rendered without `options`'
  );

  $ = dom.load(render(<Variants options={ options } />));
  assert.equal(
    $('.variants-option').length,
    2,
    'it should render options accordingly'
  );

  const options2 = [
    { id: 1, name: 'foo', values: ['foobar'] },
    { id: 2, name: 'bar', values: ['barbaz'] },
    { id: 3, name: 'baz', values: ['bazbak'] },
    { id: 4, name: 'bak', values: ['bakfoo'] },
  ];
  $ = dom.load(
    render(
      <Variants colors={ ['cyan', '#f00', '#00ff00'] } options={ options2 } />
    )
  );
  assert.equal(
    $('.variants-option')
      .eq(0)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    'cyan',
    'it should take a color from the given stack'
  );
  assert.equal(
    $('.variants-option')
      .eq(1)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    '#f00',
    'it should take a color from the given stack'
  );
  assert.equal(
    $('.variants-option')
      .eq(2)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    '#00ff00',
    'it should take a color from the given stack'
  );
  assert.equal(
    $('.variants-option')
      .eq(3)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    'cyan',
    `it should start taking colors from the beginning
    when it\`s out of the stack`
  );

  $ = dom.load(render(<Variants options={ options } />));
  assert.equal(
    $('.variants-option-remove').length,
    2,
    'it should render the proper amount of option remove buttons'
  );

  const options3 = [
    { id: 1, name: 'foo' },
  ];
  $ = dom.load(render(<Variants options={ options3 } />));
  assert.equal(
    $('.variants-option-remove').length,
    0,
    'it should not render any option remove buttons'
  );

  const product = [['foo', 'bar'], ['foo', 'baz']];
  $ = dom.load(render(<Variants product={ product } />));
  assert.equal(
    $('.variants-product').length,
    1,
    'it should render product'
  );

  $ = dom.load(render(<Variants />));
  assert.equal(
    $('.variants-product').length,
    0,
    'it should not render product if the prop is not set'
  );

  $ = dom.load(render(<Variants product={ [] } />));
  assert.equal(
    $('.variants-product').length,
    0,
    'it should not render product if the prop is an empty array'
  );

  $ = dom.load(
    render(
      <Variants colors={ ['cyan', '#f00', '#00ff00'] } product={ product } />
    )
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'cyan',
    'it should have the proper color'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    '#f00',
    'it should have the proper color'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'cyan',
    'it should have the proper color'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    '#f00',
    'it should have the proper color'
  );

  const options4 = [
    { id: 1, name: 'foo', values: ['foo'] },
    { id: 2, name: 'bar', values: [] },
    { id: 3, name: 'baz' },
    { id: 4, name: 'bak', values: ['baz', 'bar'] },
  ];
  const product2 = [['foo', 'baz'], ['foo', 'bar']];
  $ = dom.load(
    render(
      <Variants
        colors={ ['red', 'green', 'blue', 'purple'] }
        product={ product2 }
        options={ options4 }
      />
    )
  );
  assert.equal(
    $('.variants-option')
      .eq(0)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    'red',
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-option')
      .eq(1)
      .find('.variants-option-value')
      .eq(0)
      .length,
    0,
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-option')
      .eq(2)
      .find('.variants-option-value')
      .eq(0)
      .length,
    0,
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-option')
      .eq(3)
      .find('.variants-option-value')
      .eq(0)
      .css('background-color'),
    'purple',
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'red',
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    'purple',
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'red',
    'option values and product items should be consistent in terms of colors'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    'purple',
    'option values and product items should be consistent in terms of colors'
  );


  const msg = 'smtg went wrong.';
  $ = dom.load(render(<Variants error={ msg } />));
  assert.equal(
    $('.error').text(),
    msg,
    'it should show the error message'
  );

  assert.end();
});
