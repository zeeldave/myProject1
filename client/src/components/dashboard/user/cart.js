import React, { useState, useEffect} from 'react';
import DashboardLayout from 'hoc/dashboardLayout';
import Loader from 'utils/loader';
import CartDetail from './cartDetail';

import { useDispatch,useSelector} from 'react-redux';
import { removeFromCart, userPurchaseSuccess, removePersistFromCart } from 'store/actions/user.actions';

import { PayPalButton } from 'react-paypal-button-v2';
import { loadState, saveState } from "components/product/prodNfo";

const UserCart = (props) => {
    const dispatch = useDispatch();
  const persistedState = loadState();

  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);

  const removeItem = (position) => {
    dispatch(removeFromCart(position));
  };

  const removePersist = (position) => {
    dispatch(removePersistFromCart(position));
  };

  const calculateTotal = () => {
    let total = 0;

    props.users.cart.forEach((item) => {
      total += parseInt(item.price, 10);
    });
    return total;
  };

  const calculatePersistTotal = () => {
    let total = 0;

    persistedState.cart.forEach((item) => {
      total += parseInt(item.price, 10);
    });
    return total;
  };

  const generateUnits = () => [
    {
      description: " Guitars and accessories",
      amount: {
        currency_code: "AUD",
        value: calculateTotal(),
        breakdown: {
          item_total: {
            currency_code: "AUD",
            value: calculateTotal(),
          },
        },
      },
      items: generateItems(),
    },
  ];

  const generateItems = () => {
    let items = props.users.cart.map((item) => ({
      unit_amount: {
        currency_code: "AUD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
    return items;
  };

  const generatePersistUnits = () => [
    {
      description: " Guitars and accessories",
      amount: {
        currency_code: "AUD",
        value: calculatePersistTotal(),
        breakdown: {
          item_total: {
            currency_code: "AUD",
            value: calculatePersistTotal(),
          },
        },
      },
      items: generatePersistItems(),
    },
  ];

  const generatePersistItems = () => {
    let items = persistedState.cart.map((item) => ({
      unit_amount: {
        currency_code: "AUD",
        value: item.price,
      },
      quantity: 1,
      name: item.model,
    }));
    return items;
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, props.history]);

  return (
    <DashboardLayout title="Your Cart">
      {props.users.cart.length === 0 && persistedState.cart.length === 0 ? (
        <div>
          <img alt="Empty Cart" src="/images/empty_cart.png" />
          <p style={{ textAlign: "center" }}>
            {" "}
            There is nothing in your Cart...!!!
          </p>
        </div>
      ) : null}

      {props.users.cart && props.users.cart.length > 0 ? (
        <>
          <CartDetail
            products={props.users.cart}
            removeItem={(position) => removeItem(position)}
          />
          <div className="user_cart_sum">
            <div>Total Amount : ${calculateTotal()}</div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="pp_button">
              <PayPalButton
                options={{
                  clientId:
                    "AQi9pO-n27ffiIxXyL8yv_4cJfaTDgKFTypzpYOpeXSLSQ3y8VMgl028nisuRYMFHAP_e7OK5KXNSqiW",
                  currency: "AUD",
                  disableFunding: "credit,card",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: generateUnits(),
                  });
                }}
                onSuccess={(details, data) => {
                  // console.log("Details::::", details);
                  // console.log("DATA::", data);
                  dispatch(userPurchaseSuccess(details.id));
                  setLoading(true);
                }}
                onCancel={(data) => {
                  setLoading(false);
                }}
              />
            </div>
          )}
        </>
      ) : (
        <div>
          {persistedState.cart.length > 0 ? (
            <>
              <CartDetail
                products={persistedState.cart}
                removeItem={(position) => removePersist(position)}
              />
              <div className="user_cart_sum">
                <div>Total Amount : ${calculatePersistTotal()}</div>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <div className="pp_button">
                  <PayPalButton
                    options={{
                      clientId:
                        "AQi9pO-n27ffiIxXyL8yv_4cJfaTDgKFTypzpYOpeXSLSQ3y8VMgl028nisuRYMFHAP_e7OK5KXNSqiW",
                      currency: "AUD",
                      disableFunding: "credit,card",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: generatePersistUnits(),
                      });
                    }}
                    onSuccess={(details, data) => {
                      // console.log("Details::::", details);
                      // console.log("DATA::", data);
                      dispatch(userPurchaseSuccess(details.id));
                      saveState({
                        cart: [],
                      });
                      setLoading(true);
                    }}
                  />
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
    </DashboardLayout>
  );

}

export default UserCart;