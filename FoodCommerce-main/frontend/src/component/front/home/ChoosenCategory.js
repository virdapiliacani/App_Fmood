import { Card, CardBody, CardImg } from "reactstrap";

function ChoosenCategory() {
  return (
    <div className="bg-light shadow p-3">
      <h5>Kategori Pilihan</h5>
      <br />
      <div className="d-flex justify-content-between flex-wrap">
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images/categories/cat-cake.png" height="150px" top />
          <CardBody className="text-center pt-1 pb-1">Kue</CardBody>
        </Card>
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images/categories/snack.png" height="150px" top />
          <CardBody className="text-center pt-1 pb-1">Snack</CardBody>
        </Card>
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images/categories/candy.png" height="150px" top />
          <CardBody className="text-center pt-1 pb-1">Permen</CardBody>
        </Card>
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images//categories/pudding.png" height="150px" top />
          <CardBody className="text-center pt-0 pb-1">
            {"Puding & Jelly"}
          </CardBody>
        </Card>
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images/categories/yogurt.png" height="150px" top />
          <CardBody className="text-center pt-0 pb-1">Yogurt</CardBody>
        </Card>
        <Card style={{ width: "10rem" }}>
          <CardImg src="/images/categories/cookies.png" height="150px" top />
          <CardBody className="text-center pt-0 pb-1">Kue Kering</CardBody>
        </Card>
      </div>
    </div>
  );
}
export default ChoosenCategory;
