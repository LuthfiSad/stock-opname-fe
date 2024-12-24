import React, { useEffect, useState } from "react";

import { PageLayout } from "@features/admin/components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { StbDTO } from "@core/model/stb";
import { useStbById, useStbCreation } from "../hooks/useStb";
import { useLocation } from "@features/admin/location/hooks/useLocation";
import LoadingData from "@features/_global/components/LoadingData";

const InitialValue: StbDTO = {
  serialNumber: "",
  type: "",
  deviceId: "",
  numberWo: "",
  locationId: "",
  unitAddress: "",
  packageName: "",
  dateActivation: new Date(),
  status: "",
  deviceLocation: "",
  information: "",
  notes: "",
};

export const StbFormUpdate: React.FC = () => {
  const { id } = useParams();
  const mutation = useStbCreation();
  const { data: location, isLoading: loadingLocation } = useLocation();

  const [stbBody, setStbBody] = useState<StbDTO>({
    ...InitialValue,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof StbDTO, string>>>(
    {}
  );

  const { data: stbById, isLoading } = useStbById();
  useEffect(() => {
    if (stbById && stbById.data) {
      handleSetStbBody(stbById.data);
    }
  }, [stbById]);

  const handleSetStbBody = (data: StbDTO) => {
    const {
      serialNumber,
      type,
      deviceId,
      numberWo,
      locationId,
      unitAddress,
      packageName,
      dateActivation,
      status,
      deviceLocation,
      information,
      notes,
    } = data;
    setStbBody({
      serialNumber,
      type,
      deviceId,
      numberWo,
      locationId,
      unitAddress,
      packageName,
      dateActivation,
      status,
      deviceLocation,
      information,
      notes,
    });
  };

  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Partial<Record<keyof StbDTO, string>> = {};
    let isValid = true;

    if (!stbBody.serialNumber) {
      newErrors.serialNumber = "Serial Number is required";
      isValid = false;
    }

    if (!stbBody.numberWo) {
      newErrors.numberWo = "Number Wo is required";
      isValid = false;
    }

    if (!stbBody.type) {
      newErrors.type = "Type is required";
      isValid = false;
    }

    if (!stbBody.deviceId) {
      newErrors.deviceId = "Device ID is required";
      isValid = false;
    }

    if (!stbBody.locationId) {
      newErrors.locationId = "Location ID is required";
      isValid = false;
    }

    if (!stbBody.unitAddress) {
      newErrors.unitAddress = "Unit Address is required";
      isValid = false;
    }

    if (!stbBody.packageName) {
      newErrors.packageName = "Package Name is required";
      isValid = false;
    }

    if (!stbBody.dateActivation) {
      newErrors.dateActivation = "Activation Date is required";
      isValid = false;
    }

    if (!stbBody.deviceLocation) {
      newErrors.deviceLocation = "Device Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await mutation.mutateAsync({
      type: "update",
      data: {
        serialNumber: stbBody.serialNumber,
        type: stbBody.type,
        deviceId: stbBody.deviceId,
        numberWo: stbBody.numberWo,
        locationId: stbBody.locationId,
        unitAddress: stbBody.unitAddress,
        packageName: stbBody.packageName,
        dateActivation: stbBody.dateActivation,
        status: stbBody.status,
        deviceLocation: stbBody.deviceLocation,
        information: stbBody.information,
        notes: stbBody.notes,
      },
      id,
    });
  };

  const handleReset = () => {
    if (stbById && stbById.data) {
      handleSetStbBody(stbById.data);
    } else {
      setStbBody(InitialValue);
    }
    setErrors({});
  };

  return (
    <PageLayout
      title="Update Optical Network Terminal"
      headBackground="blue"
      action={{
        show: true,
        buttonTitle: "Cancel",
        buttonProps: { onClick: () => navigate(-1) },
        colorButton: "red",
      }}
    >
      {isLoading && <LoadingData />}
      {!isLoading && (
        <form className="form form-horizontal mt-4" onSubmit={handleSubmit}>
          <div className="form-body">
            <div className="row">
              {/* Serial Number Field */}
              <div className="col-md-4">
                <label htmlFor="serialNumber">Serial Number</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Serial Number"
                  id="serialNumber"
                  value={stbBody.serialNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      serialNumber: e.target.value,
                    }))
                  }
                />
                {errors.serialNumber && (
                  <small className="text-danger">{errors.serialNumber}</small>
                )}
              </div>

              {/* Type Field */}
              <div className="col-md-4">
                <label htmlFor="type">Type</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  id="type"
                  value={stbBody.type}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                />
                {errors.type && (
                  <small className="text-danger">{errors.type}</small>
                )}
              </div>

              {/* Device ID Field */}
              <div className="col-md-4">
                <label htmlFor="deviceId">Device ID</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Device ID"
                  id="deviceId"
                  value={stbBody.deviceId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      deviceId: e.target.value,
                    }))
                  }
                />
                {errors.deviceId && (
                  <small className="text-danger">{errors.deviceId}</small>
                )}
              </div>

              {/* Number WO Field */}
              <div className="col-md-4">
                <label htmlFor="numberWo">Number WO</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Number WO"
                  id="numberWo"
                  value={stbBody.numberWo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      numberWo: e.target.value,
                    }))
                  }
                />
                {errors.numberWo && (
                  <small className="text-danger">{errors.numberWo}</small>
                )}
              </div>

              {/* Location ID Field */}
              <div className="col-md-4">
                <label htmlFor="locationId">Location ID</label>
              </div>
              <div className="col-md-8 form-group">
                <select
                  disabled={mutation.isPending || loadingLocation}
                  className="form-control"
                  id="locationId"
                  value={stbBody.locationId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      locationId: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    {loadingLocation
                      ? "Loading locations..."
                      : "Select Location"}
                  </option>
                  {location?.data?.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.location}
                    </option>
                  ))}
                </select>
                {errors.locationId && (
                  <small className="text-danger">{errors.locationId}</small>
                )}
              </div>

              {/* Unit Address Field */}
              <div className="col-md-4">
                <label htmlFor="unitAddress">Unit Address</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Unit Address"
                  id="unitAddress"
                  value={stbBody.unitAddress}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      unitAddress: e.target.value,
                    }))
                  }
                />
                {errors.unitAddress && (
                  <small className="text-danger">{errors.unitAddress}</small>
                )}
              </div>

              {/* Package Name Field */}
              <div className="col-md-4">
                <label htmlFor="packageName">Package Name</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="text"
                  className="form-control"
                  placeholder="Package Name"
                  id="packageName"
                  value={stbBody.packageName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      packageName: e.target.value,
                    }))
                  }
                />
                {errors.packageName && (
                  <small className="text-danger">{errors.packageName}</small>
                )}
              </div>

              {/* Date Activation Field */}
              <div className="col-md-4">
                <label htmlFor="dateActivation">Activation Date</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="date"
                  className="form-control"
                  id="dateActivation"
                  value={
                    stbBody.dateActivation
                      ? new Date(stbBody.dateActivation)
                          .toISOString()
                          .split("T")[0]
                      : "" // Berikan nilai default jika undefined
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      dateActivation: new Date(e.target.value),
                    }))
                  }
                />
                {errors.dateActivation && (
                  <small className="text-danger">{errors.dateActivation}</small>
                )}
              </div>

              {/* Status Field */}
              <div className="col-md-4">
                <label htmlFor="status">Status</label>
              </div>
              <div className="col-md-8 form-group">
                <input
                  disabled={mutation.isPending}
                  type="checkbox"
                  className="form-check-input"
                  id="status"
                  checked={stbBody.status === "Active"}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      status: e.target.checked ? "Active" : "",
                    }))
                  }
                />
                <label htmlFor="status" className="form-check-label ml-2">
                  Active
                </label>
                {errors.status && (
                  <small className="text-danger">{errors.status}</small>
                )}
              </div>

              {/* Device Location Field */}
              <div className="col-md-4">
                <label htmlFor="deviceLocation">Device Location</label>
              </div>
              <div className="col-md-8 form-group">
                <select
                  disabled={mutation.isPending}
                  className="form-control"
                  id="deviceLocation"
                  value={stbBody.deviceLocation}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      deviceLocation: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select Device Location
                  </option>
                  {["Active", "Ready", "Back"].map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                {errors.deviceLocation && (
                  <small className="text-danger">{errors.deviceLocation}</small>
                )}
              </div>

              {/* Information Field */}
              <div className="col-md-4">
                <label htmlFor="information">Information</label>
              </div>
              <div className="col-md-8 form-group">
                <textarea
                  className="form-control"
                  placeholder="Information"
                  id="information"
                  value={stbBody.information}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      information: e.target.value,
                    }))
                  }
                />
                {errors.information && (
                  <small className="text-danger">{errors.information}</small>
                )}
              </div>

              {/* Notes Field */}
              <div className="col-md-4">
                <label htmlFor="notes">Notes</label>
              </div>
              <div className="col-md-8 form-group">
                <textarea
                  className="form-control"
                  placeholder="Notes"
                  id="notes"
                  value={stbBody.notes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setStbBody((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                />
                {errors.notes && (
                  <small className="text-danger">{errors.notes}</small>
                )}
              </div>

              {/* Submit and Reset Buttons */}
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary me-1 mb-1"
                  disabled={mutation.isPending}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-light-secondary me-1 mb-1"
                  disabled={mutation.isPending}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </PageLayout>
  );
};