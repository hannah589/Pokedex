import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSearch } from "react-icons/fa";

function SearchForm() {
  return (
    <div>
      <Form inline id="search-form">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">
              <FaSearch style={{ paddingBottom: '4px' }}/>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchForm
