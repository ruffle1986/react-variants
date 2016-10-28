import test from 'tape';
import dom from 'cheerio';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import Product from './product';

test('components - product', (assert) => {
  const value = [['foo', 'bar'], ['foo', 'baz']];

  let $ = dom.load(
    render(<Product value={ value } colors={ ['red', 'blue'] } />)
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'red',
    'it should color the product item values properly.'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(0)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    'blue',
    'it should color the product item values properly.'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(0)
      .css('color'),
    'red',
    'it should color the product item values properly.'
  );
  assert.equal(
    $('.variants-product-item')
      .eq(1)
      .find('.variants-product-item-value')
      .eq(1)
      .css('color'),
    'blue',
    'it should color the product item values properly.'
  );

  $ = dom.load(render(<Product value={ value } />));
  assert.equal(
    $('.variants-product .variants-product-item').length,
    2,
    'it should render the appropriate number of product items'
  );

  $ = dom.load(render(<Product value={ value } />));
  assert.equal(
    $('.variants-product .variants-product-item').eq(0).text(),
    'foo / bar',
    'it should render the proper product label'
  );

  $ = dom.load(render(<Product value={ value } />));
  assert.equal(
    $('.variants-product .variants-product-item').eq(1).text(),
    'foo / baz',
    'it should render the proper product label'
  );

  $ = dom.load(render(<Product value={ value } />));
  assert.equal(
    $('input[type="text"]').length,
    4,
    'it should render 4 input boxes according to the values'
  );

  $ = dom.load(render(<Product value={ value } />));
  assert.equal(
    $('input[type="text"]').eq(0).attr('placeholder'),
    '0',
    'it should have zero as a placeholder value'
  );

  assert.end();
});
