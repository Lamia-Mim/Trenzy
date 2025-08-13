import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import ShopContextProvider, { shopContext } from '../context/shopContext';
import { toast } from 'react-toastify';

// Mock toast so we can test error call
jest.mock('react-toastify', () => ({
    toast: { error: jest.fn() }
}));

const wrapper = ({ children }) => <ShopContextProvider>{children}</ShopContextProvider>;


/**
 * Unit test
 * @description
 * unit tests for shopContext provider logic,including cart operation and calculation
 * 
 */



describe('shopContext logic', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });


    /**
     * ddToCart()
     */

    test('addToCart adds a new item with size', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item1', 'M');
        });

        expect(result.current.cartItems['item1']['M']).toBe(1);

    });

    test('addToCart increments quantity if same size added again', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item1', 'M');
            result.current.addToCart('item1', 'M');
        });

        expect(result.current.cartItems['item1']['M']).toBe(2);

    });

    test('addToCart shows error if size missing', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item2', '');
        });

        expect(toast.error).toHaveBeenCalledWith('Select Product Size');

    });


    /**
    * getCartCount()
    */

    test('getCartCount returns total for single product', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item1', 'M');
        });

        expect(result.current.getCartCount()).toBe(1);

    });

    test('getCartCount sums across sizes', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item1', 'M');
            result.current.addToCart('item1', 'L');
        });

        expect(result.current.getCartCount()).toBe(2);

    });

    test('getCartCount sums across products', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });

        act(() => {
            result.current.addToCart('item1', 'M');
            result.current.addToCart('item2', 'L');
            result.current.addToCart('item2', 'L');
        });

        expect(result.current.getCartCount()).toBe(3);

    });

    /**
     * getCartAmount()
     */
    test('getCartAmount for single product', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });
        result.current.products = [{ _id: 'item1', price: 100 }];

        act(() => {
            result.current.addToCart('item1', 'M');
        });

        expect(result.current.getCartAmount()).toBe(100);

    });

    test('getCartAmount for multiple products', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });
        result.current.products = [
            { _id: 'item1', price: 100 },
            { _id: 'item2', price: 50 }
        ];

        act(() => {
            result.current.addToCart('item1', 'M');
            result.current.addToCart('item2', 'L');
        });

        expect(result.current.getCartAmount()).toBe(150);


    });

    test('getCartAmount with multiple quantities', () => {
        const { result } = renderHook(() => React.useContext(shopContext), { wrapper });
        result.current.products = [
            { _id: 'item1', price: 100 },
            { _id: 'item2', price: 50 }
        ];

        act(() => {
            result.current.addToCart('item1', 'M');
            result.current.addToCart('item2', 'L');
            result.current.addToCart('item2', 'L');
        });

        expect(result.current.getCartAmount()).toBe(200);


    });

});
