import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPizzaById, updatePizza } from "../../actions/pizzaAction";
import Loader from "./../Loader";
import Error from "./../Error";

const EditPizza = ({ match }) => {
  const [name, setname] = useState("opbolte");
  const [smallPrice, setsmallPrice] = useState("");
  const [largprice, setlargprice] = useState();
  const [mediumPrice, setmediumPrice] = useState();
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const dispatch = useDispatch();
  const getPizzaByState = useSelector((state) => state.getPizzaByIdReducer);
  const { error, pizza } = getPizzaByState;
  const updatePizzaState = useSelector((state) => state.updatePizzaByIdReducer);
  const { updateloading } = updatePizzaState;
  useEffect(() => {
    if (pizza) {
      if (pizza._id === match.params.pizzaId) {
        setname(pizza.name);
        setdescription(pizza.description);
        setcategory(pizza.category);
        setimage(pizza.image);
        setsmallPrice(pizza.prices[0]["small"]);
        setmediumPrice(pizza.prices[0]["medium"]);
        setlargprice(pizza.prices[0]["large"]);
      } else {
        dispatch(getPizzaById(match.params.pizzaId));
      }
    } else {
      dispatch(getPizzaById(match.params.pizzaId));
    }
  }, [pizza, dispatch, match.params.pizzaId]);
  const submitForm = (e) => {
    e.preventDefault();
    const updatedPizza = {
      _id: match.params.pizzaId,
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        larg: largprice,
      },
    };
    dispatch(updatePizza(updatedPizza));
  };
  return (
    <div>
      {updateloading && <Loader />}
      {error && <Error error="Add New Recipe error" />}
      {/* {success && <Success success="Pizza Added Successfully" />} */}
      <Form onSubmit={submitForm} className="bg-light p-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter E-mail"
            />
          </Form.Group>
          <Row className="mb-3 mt-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Enter Small Serving Price</Form.Label>
              <Form.Control
                type="text"
                value={smallPrice}
                onChange={(e) => setsmallPrice(e.target.value)}
                placeholder="Enter Small Serving Price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Enter Medium Serving Price</Form.Label>
              <Form.Control
                type="text"
                value={mediumPrice}
                onChange={(e) => setmediumPrice(e.target.value)}
                placeholder="Enter Serving Medium price"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Enter Large Serving Price</Form.Label>
              <Form.Control
                type="text"
                value={largprice}
                onChange={(e) => setlargprice(e.target.value)}
                placeholder="Enter Large Serving Price"
              />
            </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              ttype="text"
              value={image}
              onChange={(e) => setimage(e.target.value)}
              placeholder="Add Image URL"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="Enter Description"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            placeholder="Enter Category"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Recipe
        </Button>
      </Form>
    </div>
  );
};

export default EditPizza;
