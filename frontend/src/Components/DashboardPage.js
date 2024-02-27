import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <section id="services" class="services content-section">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h2 class="head_sec_h2">
                <span class="head_span_norm">What </span>{" "}
                <span class="head_bold_h2"> we do </span>
              </h2>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row text-center">
            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fas fa-satellite-dish fa-3x"></i>
                <div class="work_icon_div">
                  {/* <img src="images/icons/satelite.svg"> */}
                </div>
                <h4>Satellite Communication</h4>
                <p>
                  To promote and facilitate the use of satellite broadcasting
                  network for distant interactive training, education and
                  extensions.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fas fa-satellite fa-3x"></i>
                <div class="work_icon_div">
                  {/* <img src="images/icons/sensor.svg"> */}
                </div>
                <h4>Remote Sensing Applications</h4>
                <p>
                  For inventory mapping, developmental planning and monitoring
                  of natural and man-made resources.
                </p>
              </div>
            </div>

            {/* <div class="col-md-4">
                <div class="row services-item sans-shadow text-center">
                    <i class="fas fa-atom-alt fa-3x"></i>
                    <div class="work_icon_div">
                        <img src="images/icons/geo.svg">
                    </div>
                    <h4>Geo-informatics System</h4>
                    <p>To conceptualize, create and organize multi-purpose
                        common digital database for sector and thematic applications
                        for various user.</p>
                </div>
            </div> */}

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-database fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/photogrammetry.svg"> --> */}
                </div>
                <h4>Photogrammetry</h4>
                <p>
                  For creation of Digital Elevation Model, Terrain
                  characteristics, Resource planning etc.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-camera fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/disaster.svg"> --> */}
                </div>
                <h4>Disaster Management</h4>
                <p>
                  To Prepare geo-spatial information to provide necessary inputs
                  to Government to assess and mitigate damage in the event of
                  disaster.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-database fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/softwareDevelopment.svg"> --> */}
                </div>
                <h4>Software Development</h4>
                <p>
                  To provide low-cost Decision Support System, Geo-informatics
                  applications (desktop as well as web-based) to users for wider
                  usage.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-align-left fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/technology.svg"> --> */}
                </div>
                <h4>Technology Transfer</h4>
                <p>To transfer technology to a large number of end users.</p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-align-left fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/global.svg"> --> */}
                </div>
                <h4>Global Navigation Satellite System and Land Survey</h4>
                <p>
                  For Location-based services, Geo-referencing, Engineering
                  Applications, and Research.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-camera fa-3x"></i>
                <h4>Value Added Services</h4>
                <p>
                  To provide tools that can be customized as per the needs of
                  the users.
                </p>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row services-item sans-shadow text-center">
                <i class="fa fa-camera fa-3x"></i>
                <div class="work_icon_div">
                  {/* <!-- <img src="images/icons/research.svg"> --> */}
                </div>
                <h4>Education, Research and Training</h4>
                <p>
                  To provide education, research and training facilities to
                  promote a number of end users through Academy for
                  Geo-informatics.
                </p>
              </div>
            </div>

            {/* <!-- Repeat the structure for the remaining items --> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
