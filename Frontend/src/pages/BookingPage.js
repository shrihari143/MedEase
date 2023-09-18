import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // Fetch user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle availability check
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const formattedDate = date ? date.format("DD-MM-YYYY") : null;
      const formattedTime = time ? time.format("HH:mm") : null;

      const res = await axios.post(
        "/api/v1/user/booking-availability",
        {
          doctorId: params.doctorId,
          date: formattedDate,
          time: formattedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const formattedDate = date.format("DD-MM-YYYY");
      const formattedTime = time.format("HH:mm");

      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          patient_name: user.name,
          doctor_name: `${doctors.firstName} ${doctors.lastName}`,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: formattedDate,
          time: formattedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h3>Booking Page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees: {doctors.feesPerCunsaltation
}</h4>
            <h4>
              Timings: {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}
            </h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                value={date}
                onChange={(value) => setDate(value)}
              />
              <TimePicker
                className="mt-3"
                format="HH:mm"
                value={time}
                onChange={(value) => setTime(value)}
              />

              
              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
