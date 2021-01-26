module com.csc.capstone {
    requires javafx.controls;
    requires javafx.fxml;

    opens com.csc.capstone to javafx.fxml;
    exports com.csc.capstone;
}
